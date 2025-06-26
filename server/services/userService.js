import bcrypt from 'bcrypt'
import crypto from 'crypto'
import db from '../config/db.js' // Assuming this path is correct for your database connection
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { uploadToCloudinary } from '../utils/helpers.js'
const USER_FIELD_NAMES = [
  'firstname',
  'lastname',
  'email',
]
const createUser = async (firstname, lastname, email, password, role) => {
  const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email])
  if (existingUser.rows.length > 0) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const otp = randomInt(100000, 999999).toString()
  const otpExpiry = _minutesFromNow(30)

  try {
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
    console.error('Error creating user:', error);
    throw error
  }
}

const addUserPhoto = async (userId, imageUrl) => {
  await db.query(
    `UPDATE users
    SET profileimageurl = $1
    WHERE userId = $2`,
    [imageUrl, userId]
  )
}

const uploadUserProfilePhoto = async (userId, fileBuffer) => {
  if (!userId) {
    throw new Error('Missing userId for photo upload.')
  }
  if (!fileBuffer) {
    throw new Error('No image file buffer provided for upload.')
  }

  try {
    await db.query('BEGIN');

    const user = await getUserByField('userid', userId)
    if (!user) {
      throw new Error('User not found.')
    }

    const imageUrl = await uploadToCloudinary(fileBuffer, 'ptixiaki')
    console.log(`Cloudinary URL for user ${userId}: ${imageUrl}`);

    await addUserPhoto(userId, imageUrl)

    await db.query('COMMIT');
    return { success: true, message: 'User photo added successfully.' };
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(`Error in uploadUserProfilePhoto for user ${userId}:`, error.message);
    throw new Error(`Failed to upload user photo: ${error.message}`);
  }
}

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_APP_PASSWORD, 
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
    console.log(`OTP sent to ${email}`)
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}

const validateOtp = async (email, otp) => {
  console.log('Validating OTP for email:', email)
  const result = await db.query(
    'SELECT userid FROM users WHERE email = $1 AND otp = $2 AND otpExpiry > NOW()',
    [email, otp]
  )

  if (result.rows.length === 0) {
    return { success: false, message: "Invalid OTP or expired" }
  }

  await db.query('UPDATE users SET otp = NULL, otpexpiry = NULL WHERE email = $1', [email])
  console.log(`OTP validated successfully for email: ${email}`)
  return { success: true, message: "OTP validated successfully", user: result.rows[0] }
}

const getUserByField = async (fieldName, fieldValue, includePrivateFields = false) => {
  const result = await db.query(`SELECT * FROM users WHERE "${fieldName}" = $1`, [fieldValue])
  if (result.rowCount === 0) return null
  const user = result.rows[0]
  const userBase = getUserPublicWithCalculatedFields(user)
  return includePrivateFields ? { ...userBase, ...user } : userBase
}

const updateUser = async (userId, fieldName, fieldValue) => {
  if (!USER_FIELD_NAMES.includes(fieldName)) {
    throw new Error(`Invalid field name: ${fieldName}`);
  }

  const query = `
    UPDATE users
    SET "${fieldName}" = $1
    WHERE userid = $2
    RETURNING *;
  `

  const result = await db.query(query, [fieldValue, userId])

  if (result.rowCount === 0) {
    throw new Error('User not found or update failed.')
  }

  return result.rows[0]
}

const verifyToken = async (token) => {
  try {
    console.log('token', token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const user = await getUserByField('userid', userId)

    if (!user) {
      throw new Error('User not found.')
    }
    return user
  } catch (error) {
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
  const result = await db.query('SELECT * FROM users')
  return result.rows.map(getUserPublicWithCalculatedFields);
}

const getUserPublicWithCalculatedFields = (user) => {
  return {
    ...user,
    otp: undefined,
    otpexpiry: undefined,
    hashedpassword: undefined,
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

  const randomBytes = crypto.randomBytes(4)
  const randomValue = randomBytes.readUInt32BE(0)

  return min + (randomValue % range)
}

export default {
  createUser,
  getUserByField,
  addUserPhoto,
  updateUser,
  comparePasswords,
  getAllUsers,
  validateOtp,
  getUserPublicWithCalculatedFields,
  verifyToken,
  uploadUserProfilePhoto,
}
