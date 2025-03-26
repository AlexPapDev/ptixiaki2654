import express from 'express'
import db from '../config/db.js'
import axios from 'axios'
import userService from '../services/userService.js'
import CONSTANTS from '../utils/serverConstants.js'
import upload from '../utils/fileUpload.js'
import monumentService from '../services/monumentService.js'
import { authenticateUser, checkRole } from '../utils/middleware.js'
import { getAddressDetails, removeGreekTonos, transliterateString, uploadToCloudinary } from '../utils/helpers.js'

const { GEOCODE_API_URL, INSTANT_CREATION_ROLES, GREEK_TO_ENGLISH_MAP, TONOS_MAP } = CONSTANTS
const router = express.Router()

// Endpoint to get address from latitude and longitude
router.post('/get-address', async (req, res) => {
  try {
    const { latitude, longitude } = req.body
    if (!latitude || !longitude) {
      return res.status(400).json({
        status: 'error',
        message: 'Latitude and Longitude are required.',
      })
    }
    const address = await getAddressDetails(latitude, longitude)
    res.status(200).json({
      status: 'success',
      data: { address },
    })
  } catch (error) {
    console.error(`Error in /get-address: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch address.',
    })
  }
})

// Create a new monument
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, latitude, longitude, userid, categories } = req.body
    if (!name || !description || !latitude || !longitude || !userid) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields.',
      })
    }

    // Validate latitude & longitude
    const lat = parseFloat(latitude)
    const lon = parseFloat(longitude)
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ status: 'error', message: 'Invalid latitude or longitude.' })
    }

    // Fetch category IDs safely
    const categoryIds = Array.isArray(categories) ? await monumentService.getCategoryIds(categories) : []

    // Validate user existence
    const user = await userService.getUserByField('userid', userid)
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' })
    }

    // Determine approval status
    const isApproved = INSTANT_CREATION_ROLES.includes(user.role)
    const status = isApproved ? 'approved' : 'pending'

    // Get address details (ensure function handles errors gracefully)
    const address = await getAddressDetails(lat, lon)
    
    // Process name transformations
    const name_noaccents = removeGreekTonos(name)
    const name_greeklish = transliterateString(name)

    await db.query('BEGIN') // Start transaction

    // Insert monument
    const newMonument = await monumentService.createMonument(
      name,
      name_noaccents,
      name_greeklish,
      description,
      address,
      lat,
      lon,
      status
    )

    let imageUrl = null
    
    // Upload image only if provided
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, 'ptixiaki')
      await monumentService.addMonumentImage(newMonument.monumentid, imageUrl, true)
    }

    // Insert categories
    if (categoryIds.length > 0) {
      await monumentService.addMonumentCategories(newMonument.monumentid, categoryIds)
    }

    await db.query('COMMIT') // Commit transaction

    res.status(201).json({
      status: 'success',
      data: { monument: newMonument, imageUrl },
    })
  } catch (error) {
    await db.query('ROLLBACK') // Rollback transaction on failure
    console.error(`Error in monument creation: ${error.message}`)

    res.status(500).json({
      status: 'error',
      message: 'Failed to create monument.',
    })
  }
})

// Get monuments within map bounds and optional search query
router.get('/', async (req, res) => {
  console.log('monuments get')
  const { query, mapBounds, category } = req.query
  const { sw, ne } = mapBounds || {}

  try {
    if (!sw || !ne) {
      return res.status(400).json({
        status: 'error',
        message: 'Map bounds are required.',
      })
    }

    let sql = `
      SELECT 
        m.monumentId, 
        m.name, 
        m.name_noaccents, 
        m.name_greeklish, 
        m.description, 
        m.latitude, 
        m.longitude, 
        m.address,
        COALESCE(json_agg(DISTINCT mi.imageurl) FILTER (WHERE mi.imageurl IS NOT NULL), '[]') AS images,
        COALESCE(json_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL), '[]') AS categories
      FROM monuments m
      LEFT JOIN monumentimages mi ON m.monumentId = mi.monumentId
      LEFT JOIN monumentcategories mc ON m.monumentId = mc.monumentId
      LEFT JOIN categories c ON mc.categoryId = c.categoryid
      WHERE m.latitude BETWEEN $1 AND $2
        AND m.longitude BETWEEN $3 AND $4
    `

    const values = [sw.lat, ne.lat, sw.lng, ne.lng]
    let paramIndex = values.length + 1

    if (query) {
      sql += ` AND (m.name ILIKE $${paramIndex} OR m.name_greeklish ILIKE $${paramIndex} OR m.name_noaccents ILIKE $${paramIndex} OR m.name ILIKE $${paramIndex + 1})`
      values.push(`%${query}%`)

      const reverseGreeklishQuery = transliterateString(query)
      values.push(`%${reverseGreeklishQuery}%`)
      paramIndex += 2
    }

    if (category) {
      sql += ` AND EXISTS (
        SELECT 1 FROM monumentcategories mc2 
        JOIN categories c2 ON mc2.categoryId = c2.categoryid
        WHERE mc2.monumentId = m.monumentId AND c2.name = $${paramIndex}
      )`
      values.push(category)
      paramIndex++
    }

    sql += ` GROUP BY m.monumentId ORDER BY m.latitude DESC, m.longitude ASC`

    const monuments = await db.query(sql, values)

    res.status(200).json({
      status: 'success',
      results: monuments.rows.length,
      data: { monuments: monuments.rows },
    })
  } catch (error) {
    console.error(`Error in /get: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve monuments.',
    })
  }
})

router.get('/pending', authenticateUser, checkRole(['admin', 'ambassador']), async (req, res) => {
  try {
    console.log('pending')
    const pendingMonuments = await monumentService.getPendingMonuments()
    console.log('pending 2')
    res.json({ status: 'success', data: pendingMonuments })
  } catch (error) {
    console.error(`Error fetching pending monuments: ${error.message}`)
    res.status(500).json({ status: 'error', message: 'Failed to fetch pending monuments.' })
  }
})

// Get a specific monument by ID
router.get('/:id', async (req, res) => {
  console.log('get monument by id')
  const { id } = req.params

  try {
    const query = `
      SELECT 
        m.*, 
        COALESCE(json_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL), '[]') AS categories,
        COALESCE(json_agg(DISTINCT mi.imageurl) FILTER (WHERE mi.imageurl IS NOT NULL), '[]') AS images
      FROM monuments m
      LEFT JOIN monumentcategories mc ON m.monumentId = mc.monumentId
      LEFT JOIN categories c ON mc.categoryId = c.categoryId
      LEFT JOIN MonumentImages mi ON m.monumentId = mi.monumentid
      WHERE m.monumentId = $1
      GROUP BY m.monumentId
    `
    const query2 = `SELECT * FROM monuments WHERE monumentId = $1`
    const monument = await db.query(
      query,
      [id]
    )

    if (monument.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    // const categories = await db.query(
    //   `SELECT * FROM category WHERE monumentId = $1`,
    //   [id]
    // )

    res.status(200).json({
      status: 'success',
      data: {
        monument: monument.rows[0],
        // comments: comments.rows,
      },
    })
  } catch (error) {
    console.error(`Error in /get/:id: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve monument.',
    })
  }
})


router.patch('/:monumentid/approve', checkRole(['admin', 'ambassador']), async (req, res) => {
  try {
    const { monumentid } = req.params
    const approvedBy = req.user.userid // User making the request

    const updatedMonument = await monumentService.approveMonument(monumentid, approvedBy)

    res.json({ status: 'success', data: updatedMonument })
  } catch (error) {
    console.error(`Error approving monument: ${error.message}`)
    res.status(500).json({ status: 'error', message: 'Failed to approve monument.' })
  }
})


// Update a specific monument
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { description } = req.body

  if (!description) {
    return res.status(400).json({
      status: 'error',
      message: 'Description is required.',
    })
  }

  try {
    const updatedMonument = await db.query(
      `UPDATE monuments
       SET description = $1
       WHERE monumentId = $2
       RETURNING *`,
      [description, id]
    )

    if (updatedMonument.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { monument: updatedMonument.rows[0] },
    })
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/ping', (req, res) => {
  res.send('Monuments Ping!')
})

export default router