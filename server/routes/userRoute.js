import dotenv from 'dotenv'
import express from 'express'
import userService from '../services/userService.js'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import upload from '../utils/fileUpload.js'


dotenv.config()
const router = express.Router()

// Route to get all users (GET /users)
router.get('/', async (req, res) => {
  console.log('get user(s)', req.query)
  const userId = parseInt(req.query.id)
  const email = req.query.email

  let users
  try {
    if (!userId && !email) users = await userService.getAllUsers()
    if (userId) users = await userService.getUserByField('userid', userId)
    if (email) users = await userService.getUserByField('email', email)

    res.json({ data: users })
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'Internal server error' })
  }
})

router.post('/:userId/add-photo', upload.single('image'), async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing userId in the request parameters.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided for upload.',
      });
    }

    await userService.uploadUserProfilePhoto(userId, req.file.buffer)

    res.status(200).json({
      status: 'success',
      message: 'Photo added successfully to user profile.',
    });
  } catch (error) {
    console.error('Error in /:userId/add-photo route:', error.message);
    res.status(500).json({
      status: 'error',
      message: `Failed to add user photo: ${error.message}`,
    });
  }
});

// Route to create a new user (POST /users)
router.post('/', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstname').notEmpty().withMessage('Firstname is required'),
  body('lastname').notEmpty().withMessage('Lastname is required'),
], async (req, res) => {
  console.log('post user')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { firstname, lastname, password, email, role = 'normal_user' } = req.body

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
  console.log('/login')
  const { email, password } = req.body 

  try {
    const user = await userService.getUserByField('email', email, true)
    console.log('user', user)
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const isMatch = await userService.comparePasswords(password, user.hashedpassword)

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, { expiresIn: '24h' })

    const userPublic = userService.getUserPublicWithCalculatedFields(user)
    console.log(user, userPublic)
    res.send({ user: userPublic, token })
  } catch (err) {
    console.log('err')
    console.log(err)
    res.status(500).send({ error: 'Internal server error during login' })
  }
})

// Route to update user information (PATCH /users/:userId)
router.patch('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const fieldsToUpdate = Object.keys(req.body)

    if (fieldsToUpdate.length !== 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Only one field can be updated at a time for this endpoint.',
      })
    }

    const fieldName = fieldsToUpdate[0]
    const fieldValue = req.body[fieldName]

    const updatedUser = await userService.updateUser(userId, fieldName, fieldValue)

    res.status(200).json({
      status: 'success',
      message: `User ${fieldName} updated successfully`,
      user: updatedUser,
    })
  } catch (err) {
    console.error('Error updating user:', err.message)
    if (err.message.includes('User not found')) {
      return res.status(404).json({
        status: 'error',
        message: err.message,
      });
    }
    if (err.message.includes('Invalid field name')) {
      return res.status(400).json({
        status: 'error',
        message: err.message,
      })
    }
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user profile.',
    })
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

router.post('/validate-otp', async (req, res) => {
  console.log('/validate-otp')
  try {
    const { email, otp } = req.body

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' })
    }

    // Validate OTP
    const { success, user: { userid } } = await userService.validateOtp(email, otp)

    if (!success) {
      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userid }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' }
    )

    const user = await userService.getUserByField('userid', userid)
    console.log(user)
    return res.json({ message: 'OTP validated successfully', data: { user, token } })
  } catch (error) {
    console.error('OTP Validation Error:', error)
    return res.status(500).json({ error: 'An internal server error occurred' })
  }
})

// Route to resend OTP (POST /users/resend-otp)
// TODO implement resendOtp
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

export default router
