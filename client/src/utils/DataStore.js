// store/useDataStore.js
import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useDataStore = create((set, get) => ({
  // App-wide state
  isLoading: false,
  error: null,
  
  // UI state
  currentView: 'list', // or 'map'
  setCurrentView: (view) => set({ currentView: view }),
  
  // Search state
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  
  // Filter state
  filters: {
    categories: [],
    distance: null,
    rating: null
  },
  setFilters: (filters) => set({ filters }),
  
  // Sort state
  sortBy: 'name', // or 'distance', 'rating'
  sortOrder: 'asc', // or 'desc'
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  
  // Clear all state
  clearAll: () => set({
    searchQuery: '',
    searchResults: [],
    filters: {
      categories: [],
      distance: null,
      rating: null
    },
    sortBy: 'name',
    sortOrder: 'asc'
  }),

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
      const response = await axios.post(`${API_BASE_URL}/api/monuments/`, 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }})
      set({ isCreatingMonument: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating monument:', error)
      set({ isCreatingMonument: false, monumentCreationError: error.response?.data?.error || 'Failed to create monument' })
      return { success: false, error: error.response?.data?.error || 'Failed to create monument' }
    }
  },

  editMonument: async (monumentId, fieldName, fieldValue) => {
    set({ isEditingMonument: true, monumentEditingError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${API_BASE_URL}/api/monuments/${monumentId}`, 
        { [fieldName]: fieldValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      set({ isEditingMonument: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating monument:', error)
      set({ isEditingMonument: false, monumentEditingError: error.response?.data?.error || 'Failed to edit monument' })
      return { success: false, error: error.response?.data?.error || 'Failed to edit monument' }
    }
  },

  editMonumentCategories: async (monumentId, categories) => {
    set({ isEditingMonument: true, monumentEditingError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${API_BASE_URL}/api/monuments/${monumentId}/categories`, 
        { categories },
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      set({ isEditingMonument: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating monument:', error)
      set({ isEditingMonument: false, monumentEditingError: error.response?.data?.error || 'Failed to edit monument' })
      return { success: false, error: error.response?.data?.error || 'Failed to edit monument' }
    }
  },

  updateMonumentWorkingHours: async (monumentId, hoursData) => {
    set({ isEditingMonumentHours: true, monumentHoursEditingError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${API_BASE_URL}/api/monuments/${monumentId}/hours`,
        { hours: hoursData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      set({ isEditingMonumentHours: false })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error updating monument hours:', error)
      set({
        isEditingMonumentHours: false,
        monumentHoursEditingError: error.response?.data?.error || 'Failed to update working hours',
      })
      return { success: false, error: error.response?.data?.error || 'Failed to update working hours' }
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

  editList: async (listId, fieldName, fieldValue) => {
    set({ editingListId: listId, currentList: null, listUpdateError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`${API_BASE_URL}/api/lists/${listId}`, 
        { [fieldName]: fieldValue },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching list for edit:', error)
      set({ editingListId: null, listUpdateError: error.response?.data?.error || 'Failed to fetch list details' })
      return { success: false, error: error.response?.data?.error || 'Failed to fetch list details' }
    }
  },

  // --- Actions for adding/removing monuments from a list ---
  addMonumentToList: async (listId, monumentId) => {
    set({ addingMonumentToList: true, addMonumentToListError: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_BASE_URL}/api/lists/${listId}/monuments`,
        { listId, monumentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      set({
        addingMonumentToList: false,
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error adding monument to list:', error)
      set({ addingMonumentToList: false, addMonumentToListError: error.response?.data?.error || 'Failed to add monument to list' })
      return { success: false, error: error.response?.data?.error || 'Failed to add monument to list' }
    }
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

  followList: async (listId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_BASE_URL}/api/lists/follow`, 
        { listId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to follow list' }
    }
  },

  unfollowList: async (listId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${API_BASE_URL}/api/lists/unfollow/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to follow list' }
    }
  },

  getUserLists: async (searchText = '') => {
    set({ loadingLists: true, loadListsError: null, lists: [] })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/lists/me`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { searchText }
      })
      // set({ lists: response.data, loadingLists: false })
      return response.data
    } catch (error) {
      console.error('Error fetching lists:', error)
      set({ loadingLists: false, loadListsError: error.response?.data?.error || 'Failed to fetch lists' })
    }
  },

  getFollowedLists: async (searchText = '') => {
    set({ loadingLists: true, loadListsError: null, lists: [] })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/lists/following`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { searchText }
      })
      // set({ lists: response.data, loadingLists: false })
      return response.data
    } catch (error) {
      console.error('Error fetching lists:', error)
      set({ loadingLists: false, loadListsError: error.response?.data?.error || 'Failed to fetch lists' })
    }
  },

  getDiscoverLists: async (searchText = '') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/lists/discover`, {
        params: { searchText }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching lists:', error)
      set({ loadingLists: false, loadListsError: error.response?.data?.error || 'Failed to fetch lists' })
    }
  },

  getEras: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/monuments/eras`)
      debugger
      return response.data
      // return []
    } catch (error) {
      console.error('Error fetching eras:', error)
    }
  },

  addMonumentEra: async (monumentid, monumentEra) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_BASE_URL}/api/monuments/add-monument-era`, 
        { monumentid, ...monumentEra },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      return response
    } catch (error) {
      console.error('Error adding monument eras', error)
    }
  },

  updateMonumentEra: async (monumentEraId, newDescription) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${API_BASE_URL}/api/monuments/edit-monument-era/${monumentEraId}`,
        { description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      console.error('Error updating monument era:', error)
      throw error;
    }
  }
}))

export default useDataStore