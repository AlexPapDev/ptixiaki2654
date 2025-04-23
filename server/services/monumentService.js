import db from '../config/db.js' // PostgreSQL connection pool

// const getDBClient = async () => {
//   return await db.connect()
// }

const createMonument = async (
  name,
  name_noaccents, 
  name_greeklish, 
  description, 
  address, 
  latitude, 
  longitude, 
  status,
  userid,
) => {
  const result = await db.query(`
      INSERT INTO monuments (name, name_noaccents, name_greeklish, description, address, latitude, longitude, status, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *
    `,
    [name, name_noaccents, name_greeklish, description, address, latitude, longitude, status, userid]
  )
  return result.rows[0]
}

const updateMonument = async (monumentId, updateData) => {
  const { description } = updateData

  if (!description) {
    throw new Error('Description is required.')
  }

  try {
    const updatedMonument = await db.query(
      `UPDATE monuments
       SET description = $1
       WHERE monumentId = $2
       RETURNING *`,
      [description, monumentId]
    )

    if (updatedMonument.rows.length === 0) {
      return null
    }

    return updatedMonument.rows[0]
  } catch (error) {
    console.error('Error updating monument in database:', error)
    throw error
  }
}

const createMonumentHours = async (hoursData) => {
  try {
    const values = hoursData.map(hour => `(${hour.monumentid}, ${hour.day_of_week}, ${hour.open_time === null ? 'NULL' : `'${hour.open_time}'`}, ${hour.close_time === null ? 'NULL' : `'${hour.close_time}'`}, ${hour.is_open_24_hours}, ${hour.is_closed})`).join(',')
    const query = `
      INSERT INTO monumenthours (monumentid, day_of_week, open_time, close_time, is_open_24_hours, is_closed)
      VALUES ${values}
    `
    await db.query(query)
  } catch (error) {
    console.error('Error creating default monument hours:', error)
    throw error
  }
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

const getMonumentById = async (id) => {
  const query = `
    SELECT
      m.*,
      COALESCE(json_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL), '[]') AS categories,
      COALESCE(json_agg(DISTINCT mi.imageurl) FILTER (WHERE mi.imageurl IS NOT NULL), '[]') AS images,
      COALESCE(json_agg(DISTINCT (row_to_json(mh)::jsonb)) FILTER (WHERE mh.id IS NOT NULL), '[]') AS hours
    FROM monuments m
    LEFT JOIN monumentcategories mc ON m.monumentId = mc.monumentId
    LEFT JOIN categories c ON mc.categoryId = c.categoryId
    LEFT JOIN MonumentImages mi ON m.monumentId = mi.monumentid
    LEFT JOIN monumenthours mh ON m.monumentId = mh.monumentId
    WHERE m.monumentId = $1
    GROUP BY m.monumentId;
  `

  const { rows } = await db.query(query, [id])

  return rows.length > 0 ? rows[0] : null
}

const getMonumentsByStatus = async (statuses, userid = null) => {
  let query = `
    SELECT 
      m.*, 
      COALESCE(json_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL), '[]') AS categories,
      COALESCE(json_agg(DISTINCT mi.imageurl) FILTER (WHERE mi.imageurl IS NOT NULL), '[]') AS images
    FROM monuments m
    LEFT JOIN monumentcategories mc ON m.monumentId = mc.monumentId
    LEFT JOIN categories c ON mc.categoryId = c.categoryId
    LEFT JOIN monumentimages mi ON m.monumentId = mi.monumentid
    WHERE m.status = ANY($1)
  `
  
  // If userid is provided, filter by `created_by`
  const values = [statuses]
  if (userid) {
    query += ` AND m.created_by = $2`
    values.push(userid)
  }

  query += ` GROUP BY m.monumentId`

  const { rows } = await db.query(query, values)
  return rows
}

// const insertJunctionRecords = async (idA, idBArray) => {
//   if (!idA || !Array.isArray(idBArray) || idBArray.length === 0) {
//     throw new Error("Invalid input: idA must be provided and idBArray must be a non-empty array.")
//   }

//   const values = idBArray.map((idB, index) => `($1, $${index + 2})`).join(", ")
//   const query = `INSERT INTO junction_table (idA, idB) VALUES ${values} RETURNING *`

//   try {
//     const result = await db.query(query, [idA, ...idBArray])
//     return result.rows // Returns inserted rows
//   } catch (error) {
//     console.error("Error inserting junction records:", error)
//     throw error
//   }
// }

// const getPendingMonuments = async () => {
//   const query = `SELECT * FROM monuments WHERE status = 'pending'`
//   const { rows } = await db.query(query)
//   return rows
// }

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

const deleteMonument = async (monumentid) => {
  const query = `DELETE FROM monuments WHERE monumentid = $1`
  const result = await db.query(query, [monumentid])
  return result.rowCount
}

export default { 
  createMonument,
  updateMonument,
  createMonumentHours,
  addMonumentImage,
  getCategoryIds,
  addMonumentCategories,
  // getPendingMonuments,
  approveMonument,
  rejectMonument,
  getMonumentById,
  getMonumentsByStatus,
  deleteMonument,
}