import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import pool from './config/db.js' // Use the correct extension
import userRoutes from './routes/userRoute.js' // Use the correct extension
import monumentRoutes from './routes/monumentRoute.js' // Use the correct extension

dotenv.config() // Load environment variables

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Use the user routes for /api/users path
app.use('/api/users', userRoutes)
app.use('/api/monuments', monumentRoutes)

app.get('/ping', (req, res) => {
  res.send('Main Ping!')
})

async function testDbConnection() {
  console.log('starting connection test....')
  try {
    const res = await pool.query('SELECT NOW()')
    console.log('Database connected successfully!')
    console.log('Current database time:', res.rows[0].now)
  } catch (err) {
    console.error('Error connecting to the database:', err.message)
    process.exit(1)
  }
}

// Call the testDbConnection function before starting the server
testDbConnection()

const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
