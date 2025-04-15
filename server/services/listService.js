import db from '../config/db.js'

const getAllLists = async () => {
  const result = await db.query(`
    SELECT l.*, u.username
    FROM Lists l
    JOIN Users u ON l.userId = u.userId
    ORDER BY l.createdDate DESC
  `)
  return result.rows
}

const getFilteredLists = async ({ search = '', userId }) => {
  const conditions = []
  const values = []
  let idx = 1

  if (search) {
    conditions.push(`LOWER(l.name) LIKE $${idx++}`)
    values.push(`%${search.toLowerCase()}%`)
  }

  if (userId) {
    conditions.push(`l.userId = $${idx++}`)
    values.push(userId)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const result = await db.query(`
    SELECT l.*, u.username
    FROM Lists l
    JOIN Users u ON l.userId = u.userId
    ${where}
    ORDER BY l.createdDate DESC
  `, values)

  return result.rows
}


const getListsByUser = async (userId) => {
  const result = await db.query(
    'SELECT * FROM Lists WHERE userId = $1 ORDER BY createdDate DESC',
    [userId]
  )
  return result.rows
}

async function getListInfo(listId) {
  try {
    const listResult = await db.query(
      'SELECT listId, userId, name, description, createdDate, updatedDate FROM Lists WHERE listId = $1',
      [listId]
    );

    if (listResult.rows.length === 0) {
      return null
    }

    const listInfo = listResult.rows[0];

    const monumentsResult = await db.query(
      `SELECT
        m.monumentId,
        m.name,
        m.name_noaccents,
        m.name_greeklish,
        m.description,
        m.address,
        m.latitude,
        m.longitude,
        m.status,
        m.approved_by,
        m.created_by,
        m.createdDate,
        m.updatedDate
      FROM Monuments m
      JOIN ListMonuments lm ON m.monumentId = lm.monumentId
      WHERE lm.listId = $1`,
      [listId]
    )

    listInfo.monuments = monumentsResult.rows

    return listInfo
  } catch (error) {
    console.error('Error fetching list info with monuments:', error)
    throw error
  }
}

const createList = async (userId, name, description) => {
  const result = await db.query(
    `INSERT INTO Lists (userId, name, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, name, description]
  )
  return result.rows[0]
}

const addMonumentToList = async (listId, monumentId) => {
  await db.query(
    `INSERT INTO ListMonuments (listId, monumentId)
     VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [listId, monumentId]
  )
}

const addMonumentsToList = async (listId, monumentIds) => {
  const values = monumentIds.map((id, i) => `($1, $${i + 2})`).join(', ')
  const params = [listId, ...monumentIds]

  const query = `
    INSERT INTO ListMonuments (listId, monumentId)
    VALUES ${values}
    ON CONFLICT DO NOTHING
  `
  await db.query(query, params)
}


const removeMonumentFromList = async (listId, monumentId) => {
  await db.query(
    `DELETE FROM ListMonuments WHERE listId = $1 AND monumentId = $2`,
    [listId, monumentId]
  )
}

const updateList = async (listId, userId, name, description) => {
  const result = await db.query(
    `UPDATE Lists
     SET name = $1, description = $2, updatedDate = CURRENT_TIMESTAMP
     WHERE listId = $3 AND userId = $4
     RETURNING *`,
    [name, description, listId, userId]
  )
  return result.rows[0]
}

const deleteList = async (listId, userId) => {
  await db.query(
    `DELETE FROM Lists WHERE listId = $1 AND userId = $2`,
    [listId, userId]
  )
}

export default {
  getAllLists,
  getFilteredLists,
  getListsByUser,
  getListInfo,
  createList,
  addMonumentToList,
  addMonumentsToList,
  removeMonumentFromList,
  updateList,
  deleteList
}
