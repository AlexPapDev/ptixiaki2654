const express = require('express')
const router = express.Router()
const db = require('../db')

// create monument
router.post('/', async (req, res) => {
  try {
    const { description } = req.body
    const newComment = await db.query(
      'INSERT INTO comment (description) VALUES($1) RETURNING *',
      [description],
    )

    res.json(newComment.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// get monument comments
router.get('/', async (req, res) => {
  try {
    const { monumentId } = req.params

    // res.json(newComment.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})