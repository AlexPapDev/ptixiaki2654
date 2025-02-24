require("dotenv").config()
const express = require('express')
const router = express.Router()
const db = require('../db')
const userService = require('../utils/userService')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const getAllUsers = async () => {
  let sql = `
    SELECT *
    FROM users
  `
  return await db.query(sql)
}

const getProcessedUsers = (users) => {
  return users.map(user => ({
    userid: user.userid,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    hasVerifiedOtp: !user.otpExpiry,
    role: user.role,
  }))
}

// GET all users
router.get('/', async (req, res) => {
  const userId = parseInt(req.query.id)
  const email = req.query.email
  console.log(req.params, userId, email)
  let result = {}
  try {
    if (!userId && !email) result = await getAllUsers()
    if (userId) result = await userService.getUserByColumn('userId', userId)
    if (email) result = await userService.getUserByColumn('email', email)
    const processedUsers = getProcessedUsers(result.rows)
    res.json(processedUsers)
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: e.message })
  }
})

// POST a new user
router.post('/', async (req, res) => {
  const { firstname, lastname, password, email, role } = req.body
  const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const otp = randomInt(100000, 999999).toString()
  const otpExpiry = minutesFromNow(30)
  
  try {
    // Start a transaction
    await db.query('BEGIN')
    console.log(role)
    const newUser = await db.query(`
      INSERT INTO users (firstname, lastname, email, hashedPassword, otp, otpExpiry, role) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [firstname, lastname, email, hashedPassword, otp, otpExpiry, role],
    )
    await sendOtp(email, otp)
    await db.query('COMMIT')
    res.status(201).send({ message: 'Signup successful. OTP sent.' })
  } catch (error) {
    await db.query('ROLLBACK')
    console.log(error)
    res.status(500).send({ error: 'Error during signup' })
  }
})

// PUT (update) a user by ID
router.patch('/:userId', async (req, res) => {
  console.log(req.params)
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
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const query = 'DELETE FROM users WHERE userId = $1 RETURNING *';
    const result = await db.query(query, [userId]);

    if (result.rowCount > 0) {
      res.json({ message: 'Record deleted successfully', deleted: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body 

  try {
    const result = await userService.getUserByColumn('email', email)

    if (result.rowCount === 0) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    const userWithPrivateFields = result.rows[0]
    const processedUser = getProcessedUsers(result.rows)[0]
    const isMatch = await bcrypt.compare(password, userWithPrivateFields.hashedpassword)

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: processedUser.userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.send({ user: processedUser, token })
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Error during login' })
  }
})

// Validate OTP endpoint
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body
  console.log(req.body)
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 AND otp = $2 AND otpExpiry > NOW()',
      [email, otp]
    )
    console.log(result)
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

const minutesFromNow = (minutes = 60) => {
  new Date(Date.now() + minutes * 60 * 1000)
}

router.post('/resend-otp', async (req, res) => {
  const { email } = req.body
  const newOtp = randomInt(100000, 999999).toString()
  const newOtpExpiry = minutesFromNow(30)

  try {
    // Get user by email
    const result = await userService.getUserByColumn('email', email)
    
    if (result.rowCount === 0) {
      // User not found
      return res.status(404).send({ error: 'User not found' })
    }

    const user = result.rows[0]

    // Start a transaction
    await db.query('BEGIN')

    // Update OTP and OTP expiry
    const query = `
      UPDATE users
      SET otp = $1, otpExpiry = $2
      WHERE email = $3
      RETURNING *;
    `
    const newUser = await db.query(query, [newOtp, newOtpExpiry, email])

    if (newUser.rowCount === 0) {
      // If no rows were updated
      throw new Error('Failed to update OTP')
    }

    // Send OTP to user
    await sendOtp(user.email, newOtp)

    // Commit the transaction
    await db.query('COMMIT')

    // Respond with success
    res.send({ message: 'OTP sent successfully' })

  } catch (e) {
    // Rollback in case of an error
    await db.query('ROLLBACK')

    console.error('Error during OTP resend:', e)

    // Send a response with the error message
    if (e.message === 'Failed to update OTP') {
      res.status(500).send({ error: 'Error updating OTP in the database' })
    } else if (e.message.includes('sendOtp')) {
      res.status(500).send({ error: 'Error sending OTP email' })
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' })
    }
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
