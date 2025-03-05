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

app.get('/ping', (req, res) => {
  res.send('Main Ping!');
})

async function testDbConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // Query to check current time from the DB
    console.log('Database connected successfully!')
    console.log('Current database time:', res.rows[0].now)
  } catch (err) {
    console.error('Error connecting to the database:', err.message)
    process.exit(1); // Exit the server if the DB connection fails
  }
}

// Call the testDbConnection function before starting the server
testDbConnection()


const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log('aaaaa 5001')
})