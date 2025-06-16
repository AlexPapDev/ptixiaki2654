import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useListStore = create((set, get) => ({
  // State
  creatingList: false,
  listCreationError: null,
  currentList: null,
  editingListId: null,
  listUpdateError: null,
  addingMonumentToList: false,
  addMonumentToListError: null,
  lists: [],
  loadingLists: false,
  loadListsError: null,

  // List operations
  startCreateList: () => set({ 
    creatingList: true, 
    currentList: { monuments: [] }, 
    listCreationError: null 
  }),

  setListData: (data) => set((state) => ({ 
    currentList: { ...state.currentList, ...data } 
  })),

  clearCurrentList: () => set({ 
    currentList: null, 
    editingListId: null 
  }),

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
      set({ 
        creatingList: false, 
        listCreationError: error.response?.data?.error || 'Failed to create list' 
      })
      return { success: false, error: error.response?.data?.error || 'Failed to create list' }
    }
  },

  // getUserLists: async () => {
  //   set({ loadingLists: true, loadListsError: null })
  //   try {
  //     const token = localStorage.getItem('token')
  //     const response = await axios.get(`${API_BASE_URL}/api/lists/me`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     set({ lists: response.data, loadingLists: false })
  //     return { success: true, data: response.data }
  //   } catch (error) {
  //     console.error('Error fetching lists:', error)
  //     set({ 
  //       loadingLists: false, 
  //       loadListsError: error.response?.data?.error || 'Failed to fetch lists' 
  //     })
  //     return { success: false, error: error.response?.data?.error || 'Failed to fetch lists' }
  //   }
  // },

  addMonumentToList: async (listId, monumentId) => {
    set({ addingMonumentToList: true, addMonumentToListError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_BASE_URL}/api/lists/${listId}/monuments/${monumentId}`,
        { monumentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      set({ addingMonumentToList: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error adding monument to list:', error)
      set({ 
        addingMonumentToList: false, 
        addMonumentToListError: error.response?.data?.error || 'Failed to add monument to list' 
      })
      return { success: false, error: error.response?.data?.error || 'Failed to add monument to list' }
    }
  },

  removeMonumentFromList: async (listId, monumentId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `${API_BASE_URL}/api/lists/${listId}/monuments/${monumentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Update current list if it's the one being modified
      if (get().currentList?._id === listId) {
        set((state) => ({
          currentList: {
            ...state.currentList,
            monuments: state.currentList.monuments.filter(m => m.monumentId !== monumentId)
          }
        }))
      }
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error removing monument from list:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to remove monument from list' 
      }
    }
  }
}))

export default useListStore 