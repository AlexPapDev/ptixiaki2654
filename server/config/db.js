import dotenv from 'dotenv'
import pg from 'pg' // Import pg as a default import

const { Pool } = pg // Destructure Pool from the default import


dotenv.config()
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env

const pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: 5432,
  database: PGDATABASE,
  ssl: {
    require: true,
  },
})

export default pool