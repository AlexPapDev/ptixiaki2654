import express from 'express'
import db from '../config/db.js'
import { authenticateUser, attachUserIfLoggedIn } from '../utils/middleware.js'
import listService from '../services/listService.js'

const router = express.Router()

// Get all public lists (placeholder for now)
router.get('/discover', async (req, res) => {
  try {
    const { searchText } = req.query
    const lists = await listService.getAllLists(searchText)
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch lists' })
  }
})

// Get lists created by the authenticated user
router.get('/me', authenticateUser, async (req, res) => {
  try {
    console.log('/lists/me')
    const { searchText } = req.query
    const lists = await listService.getListsByUser(req.user.userid, searchText)
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch user lists' })
  }
})

// get lists followed by the authenticated user
router.get('/following', authenticateUser, async (req, res) => {
  try {
    console.log('/lists/following')
    const { searchText } = req.query
    const lists = await listService.getFollowedListsByUser(req.user.userid, searchText)
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch user lists' })
  }
})

// Get list info with monuments
router.get('/:listId', attachUserIfLoggedIn, async (req, res) => {
  try {
    console.log('get list info')
    const { user } = req
    console.log(user)
    const list = await listService.getListInfo(req.params.listId, req.user?.userid)
    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch monuments in list' })
  }
})

// Create a new list
router.post('/', authenticateUser, async (req, res) => {
  try {
    console.log('create list')
    const { name, description } = req.body
    const newList = await listService.createList(req.user.userid, name, description)
    res.status(201).json(newList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create list' })
  }
})

// Add monument to list
router.post('/:listId/monuments/:monumentId', authenticateUser, async (req, res) => {
  try {
    console.log('add monument to list')
    const { listId, monumentId } = req.params
    await listService.addMonumentToList(listId, monumentId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add monument to list' })
  }
})

// add multiple monuments to list
router.post('/:listId/monuments', authenticateUser, async (req, res) => {
  try {
    console.log('wrong add monument to list')
    const { monumentIds } = req.body // expects: [1, 2, 3]
    // await listService.addMultipleMonumentsToList(req.params.listId, monumentIds)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add monuments to list' })
  }
})

// Remove monument from list
router.delete('/:listId/monuments/:monumentId', authenticateUser, async (req, res) => {
  try {
    await listService.removeMonumentFromList(req.params.listId, req.params.monumentId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to remove monument from list' })
  }
})

// Update list info
router.put('/:listId', authenticateUser, async (req, res) => {
  try {
    const listId = req.params.listId
    const userid = req.user.userid
    const fieldToUpdate = Object.keys(req.body)[0]
    const fieldValue = req.body[fieldToUpdate]
    const allowedFields = ['name', 'description', 'is_public']

    if (!allowedFields.includes(fieldName)) {
      return res.status(400).json({ error: `Invalid field '${fieldName}' for update.` })
    }

    const updatedList = await listService.updateList(listId, userid, fieldToUpdate, fieldValue)
        if (!updatedList) {
      return res.status(404).json({ error: 'List not found or unauthorized to update.' });
    }
    res.json(updatedList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update list' })
  }
})

// Delete list
router.delete('/:listId', authenticateUser, async (req, res) => {
  try {
    await listService.deleteList(req.params.listId, req.user.userid)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete list' })
  }
})

router.post('/follow', authenticateUser, async (req, res) => {
  const { listId } = req.body
  const userid = req.user.userid
  console.log('list follow', userid, req.body)
  const listIdNum = Number(listId)
  // Input validation
  if (!listId) {
    return res.status(400).json({ message: 'listId is required.' })
  }
  if (typeof listIdNum !== 'number' || listIdNum <= 0) {
    return res.status(400).json({ message: 'listId must be a positive number.' })
  }

  try {
    const result = await listService.followList(listIdNum, userid)

    if (result.status === 201) {
      return res.status(result.status).json({ message: result.message, data: result.data })
    } else {
      return res.status(result.status).json({ message: result.message })
    }
  } catch (error) {
    console.error('Error in POST /follow route:', error)
    res.status(500).json({ message: 'An unexpected error occurred while processing your request.' })
  }
})

router.delete('/unfollow/:listId', authenticateUser, async (req, res) => {
  console.log('unfollow list')
  const { listId } = req.params
  const userid = req.user.userid
  const listIdNum = Number(listId)
  // Input validation
  if (!listId) {
    return res.status(400).json({ message: 'listId is required.' })
  }
  if (typeof listIdNum !== 'number' || listIdNum <= 0) {
    return res.status(400).json({ message: 'listId must be a positive number.' })
  }

  try {
    const result = await listService.unfollowList(listIdNum, userid)

    if (result.status === 201) {
      return res.status(result.status).json({ message: result.message, data: result.data })
    } else {
      return res.status(result.status).json({ message: result.message })
    }
  } catch (error) {
    console.error('Error in POST /unfollow route:', error)
    res.status(500).json({ message: 'An unexpected error occurred while processing your request.' })
  }
})

export default router
