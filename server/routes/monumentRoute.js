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
router.post('/', upload.array('image', 5), async (req, res) => {
  try {
    const { name, description, latitude, longitude, userid, categories, monumentEras: monumentErasString } = req.body
    if (!name || !description || !latitude || !longitude || !userid) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields.',
      })
    }

    const monumentEras = JSON.parse(monumentErasString)

    // Validate latitude & longitude
    const lat = parseFloat(latitude)
    const lon = parseFloat(longitude)
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ status: 'error', message: 'Invalid latitude or longitude.' })
    }

    // Fetch category IDs safely
    console.log(categories, typeof categories, Array.isArray(categories))
    const categoryArray = Array.isArray(categories) ? categories : categories.split(',')
    const categoryIds = await monumentService.getCategoryIds(categoryArray)

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

    await db.query('BEGIN')

    // Insert monument
    const newMonument = await monumentService.createMonument(
      name,
      name_noaccents,
      name_greeklish,
      description,
      address,
      lat,
      lon,
      status,
      userid,
    )

    // files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer, 'ptixiaki')
        console.log('imageUrl', imageUrl)
        await monumentService.addMonumentImage(newMonument.monumentid, imageUrl, true)
      }
    }

    // Insert categories
    if (categoryIds.length > 0) {
      await monumentService.addMonumentCategories(newMonument.monumentid, categoryIds)
    }

    if (monumentEras.length > 0) {
      const result = await monumentService.addMonumentEras(newMonument.monumentid, monumentEras)
      console.log('eras result', result)
    }

    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6] // Sunday to Saturday
    const defaultHours = daysOfWeek.map(day => ({
      monumentid: newMonument.monumentid,
      day_of_week: day,
      open_time: null,
      close_time: null,
      is_open_24_hours: false,
      is_closed: true,
    }))

    // Assuming your monumentService has a function to create multiple hours
    await monumentService.createMonumentHours(defaultHours)

    await db.query('COMMIT') // Commit transaction

    res.status(201).json({
      status: 'success',
      data: { monument: newMonument },
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

router.post('/:monumentId/photos', upload.array('image', 5), async (req, res) => {
  console.log('add monument photo')
  const { monumentId } = req.params

  try {
    if (!monumentId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing monumentId in the request parameters.',
      })
    }

    // Validate if the monument exists
    const existingMonument = await monumentService.getMonumentById(monumentId)
    if (!existingMonument) {
      return res.status(404).json({
        status: 'error',
        message: `Monument with ID ${monumentId} not found.`,
      })
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No images provided for upload.',
      })
    }

    await db.query('BEGIN')

    for (const file of req.files) {
      try {
        const imageUrl = await uploadToCloudinary(file.buffer, 'ptixiaki')
        console.log('imageUrl', imageUrl)
        await monumentService.addMonumentImage(monumentId, imageUrl, false) // Assuming 'false' for is_main flag for newly added images
      } catch (uploadError) {
        console.error(`Error uploading image to Cloudinary: ${uploadError.message}`)
        await db.query('ROLLBACK') // Rollback on any image upload failure
        return res.status(500).json({
          status: 'error',
          message: 'Failed to upload one or more images.',
        })
      }
    }

    await db.query('COMMIT')

    res.status(200).json({
      status: 'success',
      message: 'Photos added successfully to the monument.',
    })
  } catch (error) {
    await db.query('ROLLBACK')
    console.error(`Error adding photos to monument ${monumentId}: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to add photos to the monument.',
    })
  }
})

router.get('/eras', async (req, res) => {
  try {
    console.log('eras')
    const result = await monumentService.getEras()
    res.status(200).json({
      data: result,
      status: 'success',
      message: 'Photos added successfully to the monument.',
    })
  } catch (err) {
    console.error('Error fetching eras:', err);
    res.status(500).json({ message: 'Failed to fetch eras.' });
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
        AND status = 'approved'
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
    const pendingMonuments = await monumentService.getMonumentsByStatus(['pending'])
    res.json({ status: 'success', monuments: pendingMonuments })
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
    const monument = await monumentService.getMonumentById(id)

    if (!monument) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { monument },
    })
  } catch (error) {
    console.error(`Error in /get/:id: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve monument.',
    })
  }
})


router.patch('/:monumentid/approve', authenticateUser, checkRole(['admin', 'ambassador']), async (req, res) => {
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

router.patch('/:monumentid/reject', authenticateUser, checkRole(['admin', 'ambassador']), async (req, res) => {
  try {
    const { monumentid } = req.params
    const approvedBy = req.user.userid // User making the request

    const updatedMonument = await monumentService.rejectMonument(monumentid, approvedBy)

    res.json({ status: 'success', data: updatedMonument })
  } catch (error) {
    console.error(`Error rejecting monument: ${error.message}`)
    res.status(500).json({ status: 'error', message: 'Failed to reject monument.' })
  }
})

router.put('/:monumentId/hours', authenticateUser, async (req, res) => {
  console.log('monument hours')
  const { monumentId } = req.params
  const { hours } = req.body

  if (!Array.isArray(hours)) {
    return res.status(400).json({ status: 'error', message: 'Invalid hours data.' })
  }

  try {
    await db.query('BEGIN')

    // Delete existing hours for the monument
    await db.query('DELETE FROM monumenthours WHERE monumentid = $1', [monumentId])

    // Insert the new working hours
    if (hours.length > 0) {
      const values = hours.map(hour => `(${monumentId}, ${hour.day_of_week}, ${hour.open_time === null ? 'NULL' : `'${hour.open_time}'`}, ${hour.close_time === null ? 'NULL' : `'${hour.close_time}'`}, ${hour.is_open_24_hours}, ${hour.is_closed})`).join(',')
      const query = `
        INSERT INTO monumenthours (monumentid, day_of_week, open_time, close_time, is_open_24_hours, is_closed)
        VALUES ${values}
      `
      await db.query(query)
    }

    await db.query('COMMIT')
    res.status(200).json({ status: 'success', message: 'Working hours updated successfully.' })
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error updating working hours:', error)
    res.status(500).json({ status: 'error', message: 'Failed to update working hours.' })
  }
})

router.patch('/:id', async (req, res) => {
  console.log('update monument')
  const { id } = req.params
  const { description } = req.body

  try {
    const updatedMonument = await monumentService.updateMonument(id, { description })

    if (!updatedMonument) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { monument: updatedMonument },
    })
  } catch (error) {
    console.error('Error updating monument:', error.message)

    // Handle specific errors from the service layer if needed
    if (error.message === 'Description is required.') {
      return res.status(400).json({ status: 'error', message: error.message })
    }

    // Generic error handling
    res.status(500).json({ status: 'error', message: 'Failed to update monument' })
  }
})

router.patch('/:id/categories', async (req, res) => {
  console.log('update monument categories')
  const { id } = req.params
  const { categories } = req.body
  console.log(req.body)
  console.log(req.params)
  try {
    console.log(categories, typeof categories, Array.isArray(categories))
    const categoryIds = Array.isArray(categories) ? await monumentService.getCategoryIds(categories) : []

    let updateCategories
    if (categoryIds.length > 0) {
      await monumentService.addMonumentCategories(id, categoryIds, true)
    }

    if (!updateCategories) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { categories: updateCategories },
    })
  } catch (error) {
    console.error('Error adding categories:', error.message)

    // Generic error handling
    res.status(500).json({ status: 'error', message: 'Failed to add categories' })
  }
})

router.delete('/:monumentid', authenticateUser, checkRole(['admin', 'ambassador']), async (req, res) => {
  try {
    const { monumentid } = req.params
    const rowCount = await monumentService.deleteMonument(monumentid)
    console.log('delete result', rowCount)
    if (rowCount > 0) {
      res.status(200).json({
        status: 'success',
        data: {},
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Monument not found',
      })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

router.get('/ping', (req, res) => {
  res.send('Monuments Ping!')
})

export default router