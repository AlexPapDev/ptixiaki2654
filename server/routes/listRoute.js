import express from 'express'
import db from '../config/db.js'
import { authenticateUser } from '../utils/middleware.js'
import listService from '../services/listService.js'

const router = express.Router()

// Get all public lists (placeholder for now)
router.get('/discover', async (req, res) => {
  try {
    const lists = await listService.getAllLists()
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch lists' })
  }
})

// Get lists created by the authenticated user
router.get('/my', authenticateUser, async (req, res) => {
  try {
    const lists = await listService.getListsByUser(req.user.userId)
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch user lists' })
  }
})

// Get monuments in a list
router.get('/:listId/monuments', async (req, res) => {
  try {
    const monuments = await listService.getMonumentsInList(req.params.listId)
    res.json(monuments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch monuments in list' })
  }
})

// Create a new list
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { name, description } = req.body
    const newList = await listService.createList(req.user.userId, name, description)
    res.status(201).json(newList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create list' })
  }
})

// Add monument to list
router.post('/:listId/monuments/:monumentId', authenticateUser, async (req, res) => {
  try {
    await listService.addMonumentToList(req.params.listId, req.params.monumentId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add monument to list' })
  }
})

router.post('/:listId/monuments', authenticateUser, async (req, res) => {
  try {
    const { monumentIds } = req.body // expects: [1, 2, 3]
    await listService.addMultipleMonumentsToList(req.params.listId, monumentIds)
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
    const { name, description } = req.body
    const updatedList = await listService.updateList(req.params.listId, req.user.userId, name, description)
    res.json(updatedList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update list' })
  }
})

// Delete list
router.delete('/:listId', authenticateUser, async (req, res) => {
  try {
    await listService.deleteList(req.params.listId, req.user.userId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete list' })
  }
})

export default router
