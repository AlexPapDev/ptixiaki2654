import dotenv from 'dotenv'
import pg from 'pg'

const { Pool } = pg

dotenv.config()
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE, SSL } = process.env
console.log('SSL', SSL === 'true' ? { require: true } : false)
const pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT, 10) || 5432,
  database: PGDATABASE,
  ssl: { require: true },
})

export default pool
