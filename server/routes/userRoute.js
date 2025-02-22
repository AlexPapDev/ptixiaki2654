require("dotenv").config()
const express = require('express')
const router = express.Router()
const db = require('../db')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// GET all users
router.get('/', async (req, res) => {
  try {
    let sql = `
      SELECT *
      FROM users
    `
    const users = await db.query(sql)
    console.log('/users')
    res.json(users)
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'Error during login' })
  }
})

// GET a user by ID
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  console.log('/api/user/id', req.params.id.toString())
  try {
    let sql = `
      SELECT *
      FROM users
      WHERE userId = $1
    `
    const user = await db.query(sql, [userId])
    res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'Error during login' })
  }
})

// POST a new user
router.post('/', async (req, res) => {
  const { firstname, lastname, password, email } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const otp = randomInt(100000, 999999).toString()
  const otpExpiry = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

  try {
    // Start a transaction
    await db.query('BEGIN')

    const newUser = await db.query(`
      INSERT INTO users (firstname, lastname, email, hashedPassword, otp, otpExpiry) 
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [firstname, lastname, email, hashedPassword, otp, otpExpiry],
    )
    await sendOtp(email, otp)
    await db.query('COMMIT')
    res.status(201).send({ message: 'Signup successful. OTP sent.' })
  } catch (error) {
    await db.query('ROLLBACK')
    res.status(500).send({ error: 'Error during signup' })
  }
})

// PUT (update) a user by ID
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params
  const updatedFields = req.body
  const setClause = Object.keys(updatedFields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ")

  const values = Object.values(updatedFields);

  if (!setClause) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE userid = $${values.length + 1}
    RETURNING *;
  `

  const result = await db.query(query, [...values, userId]);
  // const userId = parseInt(req.params.id)
  // const user = users.find(u => u.id === userId)
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "Profile updated successfully", user: result.rows[0] })
})

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body 

  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rowCount === 0) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    
    const user = result.rows[0]
    const isMatch = await bcrypt.compare(password, user.hashedpassword)

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.send({ user, token })
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Error during login' })
  }
})

// Validate OTP endpoint
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body

  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 AND otp = $2 AND otpExpiry > NOW()',
      [email, otp]
    )

    if (result.rowCount === 0) {
      return res.status(400).send({ error: 'Invalid or expired OTP' })
    }

    await db.query(
      'UPDATE users SET otp = NULL, otpExpiry = NULL WHERE email = $1',
      [email]
    )

    res.send({ message: 'OTP validated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error during OTP validation' })
  }
})

// helper function
const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ptixiaki2654@gmail.com",
      pass: "awco ozhh qzgm ilib",
    },
  })

  const message = {
    from: 'ptixiaki2654@gmail.com',
    to: email,
    subject: 'Your OTP code',
    text: `Your OTP code is ${otp}`,
  }

  try {
    await transporter.sendMail(message)
  } catch (error) {
    console.error('Error sending OTP:', error)
  }
}

const randomInt = (min, max) => {
  if (min === undefined || max === undefined) {
    throw new Error('Both min and max values must be defined')
  }
  if (min >= max) {
    throw new RangeError("The min value must be less than the max value.")
  }

  const range = max - min

  // Generate a random integer between 0 (inclusive) and range (exclusive)
  const randomBytes = crypto.randomBytes(4) // 4 bytes for a 32-bit integer
  const randomInt = randomBytes.readUInt32BE(0) // Read as an unsigned 32-bit integer

  // Scale the random integer into the desired range
  return min + (randomInt % range)
}


module.exports = router
