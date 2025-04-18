// store/useDataStore.js
import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useDataStore = create((set, get) => ({
  // State for creating/editing monuments
  creatingMonument: false,
  // editingMonumentId: null,
  // currentMonument: null,
  monumentCreationError: null,
  // monumentUpdateError: null,

  // State for creating/editing lists
  creatingList: false,
  editingListId: null,
  currentList: null,
  listCreationError: null,
  listUpdateError: null,

  // State for adding monuments to lists (optional, could be part of currentList)
  addingMonumentToList: false,
  addMonumentToListError: null,

  // --- Monument Actions ---
  startCreateMonument: () => set({ creatingMonument: true, currentMonument: {}, monumentCreationError: null }),
  // setMonumentData: (data) => set((state) => ({ currentMonument: { ...state.currentMonument, ...data } })),
  // clearCurrentMonument: () => set({ currentMonument: null, editingMonumentId: null }),

  createMonument: async (formData) => {
    set({ isCreatingMonument: true, monumentCreationError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_BASE_URL}/api/monuments/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })
      set({ isCreatingMonument: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating monument:', error)
      set({ isCreatingMonument: false, monumentCreationError: error.response?.data?.error || 'Failed to create monument' })
      return { success: false, error: error.response?.data?.error || 'Failed to create monument' }
    }
  },

  // --- List Actions ---
  startCreateList: () => set({ creatingList: true, currentList: { monuments: [] }, listCreationError: null }),
  setListData: (data) => set((state) => ({ currentList: { ...state.currentList, ...data } })),
  clearCurrentList: () => set({ currentList: null, editingListId: null }),

  createList: async (listData) => {
    set({ creatingList: true, listCreationError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_BASE_URL}/api/lists`, listData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      set({ creatingList: false, currentList: null })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating list:', error)
      set({ creatingList: false, listCreationError: error.response?.data?.error || 'Failed to create list' })
      return { success: false, error: error.response?.data?.error || 'Failed to create list' }
    }
  },

  startEditList: async (listId) => {
    // set({ editingListId: listId, currentList: null, listUpdateError: null })
    // try {
    //   const token = localStorage.getItem('token')
    //   const response = await axios.get(`${API_BASE_URL}/api/lists/${listId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   set({ currentList: response.data })
    // } catch (error) {
    //   console.error('Error fetching list for edit:', error)
    //   set({ editingListId: null, listUpdateError: error.response?.data?.error || 'Failed to fetch list details' })
    //   return { success: false, error: error.response?.data?.error || 'Failed to fetch list details' }
    // }
  },

  updateList: async (listId, listData) => {
    // set({ updatingList: true, listUpdateError: null })
    // try {
    //   const token = localStorage.getItem('token')
    //   const response = await axios.put(`${API_BASE_URL}/api/lists/${listId}`, listData, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   set({ updatingList: false, currentList: null, editingListId: null })
    //   return { success: true, data: response.data }
    // } catch (error) {
    //   console.error('Error updating list:', error)
    //   set({ updatingList: false, listUpdateError: error.response?.data?.error || 'Failed to update list' })
    //   return { success: false, error: error.response?.data?.error || 'Failed to update list' }
    // }
  },

  // --- Actions for adding/removing monuments from a list ---
  addMonumentToList: async (listId, monumentId) => {
    // set({ addingMonumentToList: true, addMonumentToListError: null })
    // try {
    //   const token = localStorage.getItem('token')
    //   const response = await axios.post(
    //     `${API_BASE_URL}/api/lists/${listId}/monuments`,
    //     { monumentId },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   set((state) => ({
    //     addingMonumentToList: false,
    //     currentList: state.currentList ? { ...state.currentList, monuments: [...(state.currentList.monuments || []), response.data] } : null, // Optimistic update, adjust as needed
    //   }))
    //   return { success: true, data: response.data }
    // } catch (error) {
    //   console.error('Error adding monument to list:', error)
    //   set({ addingMonumentToList: false, addMonumentToListError: error.response?.data?.error || 'Failed to add monument to list' })
    //   return { success: false, error: error.response?.data?.error || 'Failed to add monument to list' }
    // }
  },

  removeMonumentFromList: async (listId, monumentId) => {
    // Implement the API call to remove a monument from a list
    // Update the currentList state accordingly
    // try {
    //   const token = localStorage.getItem('token')
    //   await axios.delete(`${API_BASE_URL}/api/lists/${listId}/monuments/${monumentId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   set((state) => ({
    //     currentList: state.currentList ? {
    //       ...state.currentList,
    //       monuments: (state.currentList.monuments || []).filter(m => m.monumentId !== monumentId),
    //     } : null,
    //   }))
    //   return { success: true }
    // } catch (error) {
    //   console.error('Error removing monument from list:', error)
    //   return { success: false, error: error.response?.data?.error || 'Failed to remove monument from list' }
    // }
  },
}))

export default useDataStore