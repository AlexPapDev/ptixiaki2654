import bcrypt from 'bcrypt'
import crypto from 'crypto'
import db from '../config/db.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
const USER_FIELD_NAMES = [
  'firstname',
  'lastname',
  'email',
  'profileimageurl',
]
// Create a new user
const createUser = async (firstname, lastname, email, password, role) => {
  const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email])
  if (existingUser.rows.length > 0) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const otp = randomInt(100000, 999999).toString()
  const otpExpiry = _minutesFromNow(30)

  try {
    // Start a transaction
    await db.query('BEGIN')

    const newUser = await db.query(`
      INSERT INTO users (firstname, lastname, email, hashedpassword, otp, otpexpiry, role) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [firstname, lastname, email, hashedPassword, otp, otpExpiry, role],
    )

    await sendOtp(email, otp)
    await db.query('COMMIT')

    return newUser.rows[0]
  } catch (error) {
    await db.query('ROLLBACK')
    throw error
  }
}

// Send OTP email
const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ptixiaki2654@gmail.com',
      pass: 'awco ozhh qzgm ilib',
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
    throw error
  }
}

const validateOtp = async (email, otp) => {
  console.log('validateOtp')
  const result = await db.query(
    'SELECT userid FROM users WHERE email = $1 AND otp = $2 AND otpExpiry > NOW()',
    [email, otp]
  )

  if (result.rows.length === 0) {
    return { success: false, message: "Invalid OTP or expired" }
  }

  // Invalidate OTP after successful validation
  await db.query('UPDATE users SET otp = NULL WHERE email = $1', [email])
  console.log(email, otp, result.rows)
  return { success: true, message: "OTP validated successfully", user: result.rows[0] }
}

// Get user by email
const getUserByField = async (fieldName, fieldValue, includePrivateFields = false) => {
  const result = await db.query(`SELECT * FROM users WHERE ${fieldName} = $1`, [fieldValue])
  
  // Check if the user exists
  if (result.rowCount === 0) return null
  
  const user = result.rows[0]
  const userBase = getUserPublicWithCalculatedFields(user)
  // Process the user to include the calculated field
  return includePrivateFields ? { ...userBase, ...user } : userBase
}

// Update user fields
const updateUser = async (userId, updatedFields) => {
  // Step 1: Validate the fields against the allowed field names (USER_FIELD_NAMES)
  const sanitizedFields = Object.keys(updatedFields)
    .filter(fieldName => USER_FIELD_NAMES.includes(fieldName)) // Allow only valid fields

  if (sanitizedFields.length === 0) {
    throw new Error('No valid fields to update')
  }

  // Step 2: Prepare the query dynamically based on sanitized fields
  const setClause = sanitizedFields
    .map((field, index) => `"${field}" = $${index + 1}`)
    .join(', ')

  const values = sanitizedFields.map(field => updatedFields[field])

  // Step 3: Perform the update query
  const query = `
    UPDATE users
    SET ${setClause}
    WHERE userid = $${values.length + 1}
    RETURNING *;
  `

  const result = await db.query(query, [...values, userId])

  if (result.rowCount === 0) {
    throw new Error('User not found or update failed')
  }

  // Step 4: Return the updated user object
  return result.rows[0]
}

const verifyToken = async (token) => {
  try {
    console.log('verify')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const user = await getUserByField('userId', userId)

    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    console.log('Token verification failed:', error.message)
    console.error('Token verification failed:', error.message)
    return null
  }
}

const comparePasswords = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword)
}

const _minutesFromNow = (minutes = 60) => {
  return new Date(Date.now() + minutes * 60 * 1000)
}

const _getHasVerifiedOtp = (user) => {
  return !user.otp || new Date(user.otpexpiry) < new Date()
}

const getAllUsers = async () => {
  return await db.query('SELECT * FROM users')
}

const getUserPublicWithCalculatedFields = (user) => {
  return {
    ...user,
    otp: null,
    otpexpiry: null,
    hashedpassword: null,
    hasVerifiedOtp: _getHasVerifiedOtp(user)
  }
}

const randomInt = (min, max) => {
  if (min === undefined || max === undefined) {
    throw new Error('Both min and max values must be defined')
  }
  if (min >= max) {
    throw new RangeError('The min value must be less than the max value.')
  }

  const range = max - min

  // Generate a random integer between 0 (inclusive) and range (exclusive)
  const randomBytes = crypto.randomBytes(4) // 4 bytes for a 32-bit integer
  const randomInt = randomBytes.readUInt32BE(0) // Read as an unsigned 32-bit integer

  // Scale the random integer into the desired range
  return min + (randomInt % range)
}

export default { 
  createUser,
  getUserByField,
  updateUser,
  comparePasswords,
  getAllUsers,
  validateOtp,
  getUserPublicWithCalculatedFields,
  verifyToken,
}
