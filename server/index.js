require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const userRoutes = require('./routes/userRoute')
const monumentRoutes = require('./routes/monumentRoute')

/**
 * middleware
 * cors():
 * express.json()
**/ 
app.use(cors())
app.use(express.json())

// Use the user routes for /api/users path
app.use('/api/users', userRoutes)
app.use('/api/monuments', monumentRoutes)


const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log('aaaaa 5001')
})