const express = require('express')
const router = express.Router()
const db = require('../db')
const axios = require('axios')
const userService = require('../utils/userService')
const CONSTANTS = require('../utils/serverConstants')
const uploadToCloudinary = require('../utils/cloudinaryConfig')

const { GEOCODE_API_URL, INSTANT_CREATION_ROLES, GREEK_TO_ENGLISH_MAP, TONOS_MAP } = CONSTANTS

// Utility function to fetch address from coordinates
const getAddressDetails = async (lat, lon) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        lat,
        lon,
        format: 'json',
      },
    })
    return response.data.address
  } catch (error) {
    return { street: null, house_number: null, city: null, postcode: null }
  }
}

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

// TODO: put these on a different file
const transliterateString = (str) => {
  return str.split('').map(char => GREEK_TO_ENGLISH_MAP[char] || char).join('');
}

const removeGreekTonos = (str) => {
  return str.split('').map(char => TONOS_MAP[char] || char).join('');
}
// Create a new monument
router.post('/', async (req, res) => {
  try {
    const { name, description, latitude, longitude, userid } = req.body
    const { buffer } = req.file

    if (!name || !description || !latitude || !longitude || !userid) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields.',
      })
    }

    const user = await userService.getUserByField('userid', userid) // Assuming async operation
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      })
    }

    const isapproved = INSTANT_CREATION_ROLES.includes(user.role)
    const address = await getAddressDetails(latitude, longitude)
    const name_noaccents = removeGreekTonos(name)
    const name_greeklish = transliterateString(name)
    const newMonument = await db.query(
      `INSERT INTO monuments (name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved]
    )

    res.status(201).json({
      status: 'success',
      results: newMonument.rows.length,
      data: { monuments: newMonument.rows },
    })
  } catch (error) {
    console.error(`Error in monument creation: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create monument.',
    })
  }
})

// Get monuments by search query
// TODO this isnt used currently
router.get('/:query', async (req, res) => {
  const { query } = req.params
  try {
    const searchQuery = `%${query}%`
    const allMonuments = await db.query(
      `SELECT monumentId, name, description, latitude, longitude
       FROM monuments
       WHERE name ILIKE $1`,
      [searchQuery]
    )

    res.status(200).json({
      status: 'success',
      results: allMonuments.rows.length,
      data: { monuments: allMonuments.rows },
    })
  } catch (error) {
    console.error(`Error in /get/:query: ${error.message}`)
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve monuments.',
    })
  }
})

// Get monuments within map bounds and optional search query
router.get('/', async (req, res) => {
  console.log('monuments get')
  const { query, mapBounds } = req.query
  const { sw, ne } = mapBounds || {}
  try {
    if (!sw || !ne) {
      return res.status(400).json({
        status: 'error',
        message: 'Map bounds are required.',
      })
    }

    let sql = `
      SELECT monumentId, name, name_noaccents, name_greeklish, description, latitude, longitude, address
      FROM monuments
      WHERE latitude BETWEEN $1 AND $2
        AND longitude BETWEEN $3 AND $4
    `

    const values = [sw.lat, ne.lat, sw.lng, ne.lng]
    if (query) {
      sql += ' AND (name ILIKE $5 OR name_greeklish ILIKE $5 OR name_noaccents ILIKE $5 OR name ILIKE $6)'
      values.push(`%${query}%`)

      const reverseGreeklishQuery = transliterateString(query)
      values.push(`%${reverseGreeklishQuery}%`)
    }

    const monuments = await db.query(sql, values)
    monuments.rows.sort((a, b) => b.latitude - a.latitude || a.longitude - b.longitude)
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

// Get a specific monument by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const monument = await db.query(
      `SELECT * FROM monuments WHERE monumentId = $1`,
      [id]
    )

    if (monument.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Monument not found.',
      })
    }

    const comments = await db.query(
      `SELECT * FROM comments WHERE monumentId = $1`,
      [id]
    )

    res.status(200).json({
      status: 'success',
      data: {
        monument: monument.rows[0],
        comments: comments.rows,
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
  res.send('Monuments Ping!');
})

module.exports = router