import db from '../config/db.js' // PostgreSQL connection pool

// const getDBClient = async () => {
//   return await db.connect()
// }

const createMonument = async (name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved) => {
  const result = await db.query(
    `INSERT INTO monuments (name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved]
  )
  return result.rows[0]
}

const addMonumentImage = async (monumentId, imageUrl, isMain) => {
  await db.query(
    `INSERT INTO monumentimages (monumentid, imageurl, ismain) VALUES ($1, $2, $3)`,
    [monumentId, imageUrl, isMain]
  )
}

export default { createMonument, addMonumentImage }