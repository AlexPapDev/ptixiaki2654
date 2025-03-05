require("dotenv").config()
const Pool = require('pg').Pool

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env

console.log(PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE)

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

module.exports = pool