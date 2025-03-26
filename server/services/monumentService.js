import db from '../config/db.js' // PostgreSQL connection pool

// const getDBClient = async () => {
//   return await db.connect()
// }

const createMonument = async (name, name_noaccents, name_greeklish, description, address, latitude, longitude, status) => {
  const result = await db.query(
    `INSERT INTO monuments (name, name_noaccents, name_greeklish, description, address, latitude, longitude, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, name_noaccents, name_greeklish, description, address, latitude, longitude, status]
  )
  return result.rows[0]
}

const addMonumentImage = async (monumentId, imageUrl, isMain) => {
  await db.query(
    `INSERT INTO monumentimages (monumentid, imageurl, ismain) VALUES ($1, $2, $3)`,
    [monumentId, imageUrl, isMain]
  )
}

const getCategoryIds = async (categoryNames) => {
  console.log('getCategoryIds', categoryNames, typeof categoryNames)
  const categories = await db.query(
    `SELECT categoryid FROM categories WHERE name = ANY($1::text[])`,
    [categoryNames.split(',')]
  )
  return categories.rows.map(category => category.categoryid)
}

const addMonumentCategories = async (monumentId, categoryIds) => {
  const values = categoryIds.map((categoryId, index) => `($1, $${index + 2})`).join(", ")
  const query = `INSERT INTO monumentcategories (monumentId, categoryId) VALUES ${values} RETURNING *`
  try {
    const result = await db.query(query, [monumentId, ...categoryIds])
    console.log(result.rows)
    return result.rows 
  } catch (error) {
    console.error("Error inserting monument categories:", error)
    throw error
  }
}

const insertJunctionRecords = async (idA, idBArray) => {
  if (!idA || !Array.isArray(idBArray) || idBArray.length === 0) {
    throw new Error("Invalid input: idA must be provided and idBArray must be a non-empty array.")
  }

  const values = idBArray.map((idB, index) => `($1, $${index + 2})`).join(", ")
  const query = `INSERT INTO junction_table (idA, idB) VALUES ${values} RETURNING *`

  try {
    const result = await db.query(query, [idA, ...idBArray])
    return result.rows // Returns inserted rows
  } catch (error) {
    console.error("Error inserting junction records:", error)
    throw error
  }
}

const getPendingMonuments = async () => {
  const query = `SELECT * FROM monuments WHERE status = 'pending'`
  const { rows } = await db.query(query)
  return rows
}

const approveMonument = async (monumentid, approvedBy) => {
  const query = `UPDATE monuments SET status = 'approved', approved_by = $1 WHERE monumentid = $2 RETURNING *`
  const { rows } = await db.query(query, [approvedBy, monumentid])
  return rows[0]
}

const rejectMonument = async (monumentid) => {
  const query = `UPDATE monuments SET status = 'rejected' WHERE monumentid = $1 RETURNING *`
  const { rows } = await db.query(query, [monumentid])
  return rows[0]
}


export default { 
  createMonument,
  addMonumentImage,
  getCategoryIds,
  addMonumentCategories,
  getPendingMonuments,
  approveMonument,
  rejectMonument,
}