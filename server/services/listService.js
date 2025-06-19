import db from '../config/db.js'

const getAllLists = async (searchText) => {
  const result = await db.query(
    `
    SELECT
      l.*,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'monumentId', m.monumentId,
            'name', m.name,
            'mainImage', mi.imageurl
          )
        ) FILTER (WHERE m.monumentId IS NOT NULL),
        '[]'::json
      ) AS monuments
    FROM Lists l
    LEFT JOIN listmonuments lm ON l.listId = lm.listId
    LEFT JOIN monuments m ON lm.monumentId = m.monumentId
    LEFT JOIN monumentimages mi ON m.monumentId = mi.monumentid AND mi.ismain = true
    WHERE (NULLIF($1, '') IS NULL OR l.name ILIKE '%' || $1 || '%')
      AND l.is_public = TRUE
    GROUP BY l.listId
    ORDER BY l.createdDate DESC
    LIMIT 9
    `,
    [searchText]
  )
  return result.rows || []
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

const getListsByUser = async (userId, searchText) => {
  const result = await db.query(
    `
    SELECT
      l.*,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'monumentId', m.monumentId,
            'name', m.name,
            'mainImage', mi.imageurl
          )
        ) FILTER (WHERE m.monumentId IS NOT NULL),
        '[]'::json
      ) AS monuments,
      TRIM(CONCAT(u.firstname, ' ', u.lastname)) AS full_name
    FROM Lists l
    LEFT JOIN Users u ON l.userId = u.userId
    LEFT JOIN listmonuments lm ON l.listId = lm.listId
    LEFT JOIN monuments m ON lm.monumentId = m.monumentId
    LEFT JOIN monumentimages mi ON m.monumentId = mi.monumentid AND mi.ismain = true
    WHERE l.userId = $1
      AND (NULLIF($2, '') IS NULL OR l.name ILIKE '%' || $2 || '%')
    GROUP BY l.listId, u.firstname, u.lastname
    ORDER BY l.createdDate DESC
    `,
    [userId, searchText]
  )
  return result.rows || []
}

async function getListInfo(listId, viewerUserId = null) {
  console.log('getListInfo', listId, 'viewerUserId:', viewerUserId)
  try {
    const query = `
      SELECT
        l.listId,
        l.userId,
        l.name,
        l.description,
        l.createdDate,
        l.updatedDate,
        u.firstname,
        u.lastname,
        CASE
          WHEN $1::INT IS NOT NULL THEN EXISTS (
            SELECT 1
            FROM FollowedLists fl
            WHERE fl.listId = l.listId AND fl.followerId = $1
          )
          ELSE FALSE
        END AS is_followed_by_current_user
      FROM Lists l
      JOIN Users u ON l.userId = u.userId
      WHERE l.listId = $2`
    const listResult = await db.query(query, [viewerUserId, listId]
      // `SELECT
      //   l.listId,
      //   l.userId,
      //   l.name,
      //   l.description,
      //   l.createdDate,
      //   l.updatedDate,
      //   u.firstname,
      //   u.lastname,
      //   CASE
      //     WHEN $2 IS NOT NULL THEN EXISTS (
      //       SELECT 1
      //       FROM FollowedLists fl
      //       WHERE fl.listId = l.listId AND fl.followerId = $2::INT
      //     )
      //     ELSE FALSE
      //   END AS is_followed_by_current_user
      // FROM Lists l
      // JOIN Users u ON l.userId = u.userId
      // WHERE l.listId = $1`,
      // [listId, 41]
    )

    if (listResult.rows.length === 0) {
      return null
    }

    listResult.rows[0].full_name = listResult.rows[0].lastname + ' ' + listResult.rows[0].firstname
    const listInfo = listResult.rows[0]

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
        m.updatedDate,
        COALESCE(
            (SELECT mi.imageurl FROM MonumentImages mi WHERE mi.monumentId = m.monumentId AND mi.ismain = TRUE LIMIT 1),
            (SELECT mi.imageurl FROM MonumentImages mi WHERE mi.monumentId = m.monumentId LIMIT 1)
        ) AS main_image_url
      FROM Monuments m
      JOIN ListMonuments lm ON m.monumentId = lm.monumentId
      WHERE lm.listId = $1
      `,
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

const followList = async (listId, userId) => {
  try {
    // Existing follow check
    const checkQuery = `
      SELECT *
      FROM FollowedLists
      WHERE followerId = $1 AND listId = $2
    `
    const checkResult = await db.query(checkQuery, [userId, listId])

    if (checkResult.rows.length > 0) {
      return { status: 409, message: 'You are already following this list.' }
    }

    // Insertion
    const insertQuery = `
      INSERT INTO FollowedLists (followerId, listId)
      VALUES ($1, $2)
      RETURNING *
    `
    const result = await db.query(insertQuery, [userId, listId])

    if (result.rows.length > 0) {
      return { status: 201, message: 'List followed successfully!', data: result.rows[0] }
    } else {
      return { status: 500, message: 'Failed to follow list. Please try again.' }
    }

  } catch (error) {
    console.error('Error in listService.followList:', error)
    throw new Error('Database operation failed while following the list.')
  }
}

const unfollowList = async (listId, userId) => {
  try {
    const checkQuery = `
      SELECT *
      FROM FollowedLists
      WHERE followerId = $1 AND listId = $2
    `
    const checkResult = await db.query(checkQuery, [userId, listId])

    if (checkResult.rows.length === 0) {
      return { status: 404, message: 'You are not following this list.' } // 404 Not Found
    }

    // 2. Delete the record from the FollowedLists table
    const deleteQuery = `
      DELETE FROM FollowedLists
      WHERE followerId = $1 AND listId = $2
      RETURNING *
    `
    const result = await db.query(deleteQuery, [userId, listId])

    if (result.rows.length > 0) {
      return { status: 200, message: 'List unfollowed successfully!' } // 200 OK
    } else {
      // This case should ideally not be reached if checkResult.rows.length > 0
      return { status: 500, message: 'Failed to unfollow list. Please try again.' }
    }

  } catch (error) {
    console.error('Error in listService.unfollowList:', error)
    throw new Error('Database operation failed while unfollowing the list.')
  }
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
  deleteList,
  followList,
  unfollowList,
}
