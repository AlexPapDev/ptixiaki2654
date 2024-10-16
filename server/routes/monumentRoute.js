const express = require('express')
const router = express.Router()
const db = require('../db')

// create monument
router.post('/', async (req, res) => {
  try {
    const { 
      name,
      description, 
      address,
      city,
      municipality,
      latitude,
      longitude 
    } = req.body
    const newMonument = await db.query(`
      INSERT INTO monuments (name, description, address, city, municipality, latitude, longitude)
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [name, description, address, city, municipality, latitude, longitude],
    )
    res.status(200).json({
      status: "success",
      results: newMonument.rows.length,
      data: {
        monuments: newMonument.rows,
      },
    });
  } catch (err) {
    console.error(err)
  }
})

// get all monuments
router.get('/', async (req, res) => {
  try {
    const allMonuments = await db.query(`
      SELECT description
      FROM monuments
    `)
    res.json(allMonuments.rows)
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

module.exports = router;
