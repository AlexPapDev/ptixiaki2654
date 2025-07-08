import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useUserStore = create((set) => ({
  // State
  isLoading: false,
  error: null,
  currentUser: null,

  // User operations
  getUserProfile: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const result = await axios.get(`${API_BASE_URL}/api/users/`, { 
        params: { id: userId }
      })
      set({ isLoading: false, currentUser: result.data })
      return { success: true, data: result.data }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      set({ 
        isLoading: false, 
        error: error.response?.data?.error || 'Failed to fetch user profile'
      })
      return { success: false, error: error.response?.data?.error || 'Failed to fetch user profile' }
    }
  },

  updateUserProfile: async (userId, updatedData) => {
    set({ isLoading: true, error: null });
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/users/${userId}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json', // Assume JSON for all updates
            Authorization: `Bearer ${token}`
          }
        }
      );

      set({ isLoading: false, currentUser: response.data.user || response.data });
      return { success: true, data: response.data.user || response.data };
    } catch (error) {
      console.error('Error updating user profile:', error.response?.data || error.message);
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to update user profile.'
      })
      return { success: false, error: error.response?.data?.message || 'Failed to update user profile.' };
    }
  },

  signupUser: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const result = await axios.post(`${API_BASE_URL}/api/users/`, userData)
      set({ isLoading: false })
      return { success: true, data: result.data }
    } catch (error) {
      console.error('Error signing up:', error)
      set({ 
        isLoading: false, 
        error: error.response?.data?.error || 'Failed to sign up'
      })
      return { success: false, error: `${error.response?.data.errors.map(e => e.msg)}` || 'Failed to sign up' }
    }
  }
}))

export default useUserStore 