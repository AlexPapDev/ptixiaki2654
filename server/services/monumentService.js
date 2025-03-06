import db from '../config/db.js' // PostgreSQL connection pool

const getDBClient = async () => {
  return await db.connect()
}

const createMonument = async (client, name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved) => {
  const result = await client.query(
    `INSERT INTO monuments (name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, name_noaccents, name_greeklish, description, address, latitude, longitude, isapproved]
  )
  return result.rows[0]
}

const addMonumentImage = async (client, monumentId, imageUrl, isMain) => {
  await client.query(
    `INSERT INTO monument_images (monument_id, image_url, is_main) VALUES ($1, $2, $3)`,
    [monumentId, imageUrl, isMain]
  )
}

export default { getDBClient, createMonument, addMonumentImage }