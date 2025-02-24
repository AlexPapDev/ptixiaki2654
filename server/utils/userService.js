const db = require('../db')

const getUserByColumn = async (columnName, value) => {
  const sql = `
    SELECT *
    FROM users
    WHERE ${columnName} = $1
  `
  return await db.query(sql, [value])
}

module.exports = {
  getUserByColumn,
  // other user-related services
}