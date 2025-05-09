import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useMonumentStore = create((set, get) => ({
  // State
  creatingMonument: false,
  monumentCreationError: null,
  isEditingMonument: false,
  monumentEditingError: null,
  isEditingMonumentHours: false,
  monumentHoursEditingError: null,
  pendingMonuments: null,
  loadingPendingMonuments: false,

  // Monument CRUD operations
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
      console.error('Error editing monument:', error)
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
      console.error('Error editing monument categories:', error)
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

  // Monument approval operations
  getPendingMonuments: async () => {
    // Return cached data if available and not force refreshing
    if (get().pendingMonuments && !get().loadingPendingMonuments) {
      return { success: true, data: get().pendingMonuments }
    }

    set({ loadingPendingMonuments: true })
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get(`${API_BASE_URL}/api/monuments/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ pendingMonuments: result.data, loadingPendingMonuments: false })
      return { success: true, data: result.data }
    } catch (error) {
      console.error('Error fetching pending monuments:', error)
      set({ loadingPendingMonuments: false })
      return { success: false, error: error.response?.data?.error || 'Failed to fetch pending monuments' }
    }
  },

  approveMonument: async (monumentId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${API_BASE_URL}/api/monuments/${monumentId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Update pending monuments cache
      set((state) => ({
        pendingMonuments: state.pendingMonuments?.filter(m => m._id !== monumentId)
      }))
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error approving monument:', error)
      return { success: false, error: error.response?.data?.error || 'Failed to approve monument' }
    }
  },

  rejectMonument: async (monumentId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${API_BASE_URL}/api/monuments/${monumentId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Update pending monuments cache
      set((state) => ({
        pendingMonuments: state.pendingMonuments?.filter(m => m._id !== monumentId)
      }))
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error rejecting monument:', error)
      return { success: false, error: error.response?.data?.error || 'Failed to reject monument' }
    }
  },

  getMonumentAddress: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/monuments/get-address`, data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error getting monument address:', error)
      return { success: false, error: error.response?.data?.error || 'Failed to get monument address' }
    }
  }
}))

export default useMonumentStore 