require('dotenv').config()
const express = require('express')
const router = express.Router()
const userService = require('../utils/userService')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// Route to get all users (GET /users)
router.get('/', async (req, res) => {
  const userId = parseInt(req.query.id)
  const email = req.query.email
  let result = {}

  try {
    if (!userId && !email) result = await userService.getAllUsers()
    if (userId) result = await userService.getUserByField('userId', userId)
    if (email) result = await userService.getUserByField('email', email)

    const processedUsers = userService.getProcessedUsers(result.rows)
    res.json(processedUsers)
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'Internal server error' })
  }
})

// Route to create a new user (POST /users)
router.post('/', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstname').notEmpty().withMessage('Firstname is required'),
  body('lastname').notEmpty().withMessage('Lastname is required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { firstname, lastname, password, email, role } = req.body

  try {
    const newUser = await userService.createUser(firstname, lastname, email, password, role)
    res.status(201).send({ message: 'Signup successful. OTP sent.' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ error: error.message })
  }
})

// Route to login a user (POST /users/login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body 

  try {
    const user = await userService.getUserByField('email', email, true)

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    console.log('password', password, user)
    const isMatch = await userService.comparePasswords(password, user.hashedpassword)

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' })
    const userWithoutPrivateFields = {
      ...user,
      otp: null,
      otpExpiry: null,
      hashedpassword: null,
    }
    res.send({ user: userWithoutPrivateFields, token })
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Internal server error during login' })
  }
})

// Route to update user information (PATCH /users/:userId)
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params
  const updatedFields = req.body
  try {
    const updatedUser = await userService.updateUser(userId, updatedFields)
    res.json({ message: 'Profile updated successfully', user: updatedUser })
  } catch (err) {
    console.error(err)
    res.status(400).send({ error: err.message })
  }
})

// Route to delete a user (DELETE /users/:userId)
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const result = await userService.deleteUserById(userId)
    if (result) {
      res.json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    console.error('Error deleting record:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to validate OTP (POST /users/validate-otp)
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body
  try {
    const result = await userService.validateOtp(email, otp)

    if (result) {
      res.send({ message: 'OTP validated successfully' })
    } else {
      res.status(400).send({ error: 'Invalid or expired OTP' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error during OTP validation' })
  }
})

// Route to resend OTP (POST /users/resend-otp)
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body
  try {
    const result = await userService.resendOtp(email)

    if (result) {
      res.send({ message: 'OTP sent successfully' })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error during OTP resend' })
  }
})

module.exports = router
