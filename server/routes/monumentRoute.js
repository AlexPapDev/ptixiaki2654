const express = require('express')
const router = express.Router()
const db = require('../db')
const axios = require('axios')
const GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/reverse'
// TODO add meaningful error handling on all routes

const getAddressDetails = async (lat, lon) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        lat,
        lon,
        format: 'json',
      }
    })
    return response.data.address
  } catch (error) {
    console.error('Error fetching address:', error)
    return { street: null, house_number: null, city: null, postcode: null }
  }
}

router.post('/get-address', async (req, res) => {
  try {
    const { latitude, longitude } = req.body
    console.log(req.body)
    const address = await getAddressDetails(latitude, longitude)
    res.status(200).json({
      status: "success",
      data: {
        address
      },
    })
  } catch (error) {
    console.error(err)
  }
})
// create monument
router.post('/', async (req, res) => {
  try {
    const { 
      name,
      description,
      latitude,
      longitude 
    } = req.body
    const address = await getAddressDetails(latitude, longitude)
    const newMonument = await db.query(`
      INSERT INTO monuments (name, description, address, latitude, longitude)
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *`,
      [name, description, address, latitude, longitude],
    )
    res.status(200).json({
      status: "success",
      results: newMonument.rows.length,
      data: {
        monuments: newMonument.rows,
      },
    })
  } catch (err) {
    console.error(err)
  }
})

// get  monuments
router.get('/:query', async (req, res) => {
  const { query } = req.params

  try {
    const allMonuments = await db.query(`
      SELECT monumentId, name, description, latitude, longitude
      FROM monuments
      WHERE name LIKE '%$1%'
    `,
      [query]
    )
    res.json(allMonuments.rows)
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/', async (req, res) => {
  console.log('api/monuments/')

  const { query, mapBounds } = req?.query
  const { sw, ne } = mapBounds || {}

  try {
    let sql = `
      SELECT monumentId, name, description, latitude, longitude
      FROM monuments
      WHERE latitude BETWEEN $1 AND $2
        AND longitude BETWEEN $3 AND $4
    `
    const values = [sw.lat, ne.lat, sw.lng, ne.lng]

    if (query) {
      sql += ' AND name ILIKE $5'
      values.push(`%${query}%`)
    }
    const monuments = await db.query(sql, values)
    monuments.rows.sort((a, b) => b.latitude - a.latitude || a.longitude - b.longitude)
    res.json(monuments.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// get a specific monument
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const monument = await db.query(`
      SELECT *
      FROM Monuments
      WHERE monumentId = $1`,
      [id]
    )

    const comments = await db.query(`
      SELECT *
      FROM Comments
      WHERE commentId = $1`,
      [id]
    )
    res.status(200).json({
      status: "success",
      data: {
        monument: monument.rows[0],
        comments: comments.comments,
      },
    })
  } catch (err) {
    console.error(err)
  }
})

// update a monument
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updatedMonument = await db.query(`
      UPDATE monument
      SET description = $1
      WHERE id = $2`,
      [description, id]
    )
    res.json(monument.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router
