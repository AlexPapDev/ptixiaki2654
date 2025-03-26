// store/useAuthStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      isLoggedIn: () => {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const decoded = jwtDecode(token)
            return decoded.exp * 1000 > Date.now()
          } catch (error) {
            return false
          }
        }
        return false
      },
      
      // loginUser: ({ user, token }) => set({ user, token }),
      loginUser: async (email, password) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/api/users/login`,
            { email, password },
          )
          const { token, user } = res.data

          // Decode JWT payload
          const payload = JSON.parse(atob(token.split('.')[1]))
          debugger
          const { id, role } = payload
          // const user = { id, role }

          localStorage.setItem('token', token)
          set({ user, token })
          return { success: true, user }
        } catch (err) {
          return { success: false, message: err.response?.data?.error || 'Login failed' }
        }
      },

      logoutUser: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null })
      },

      updateUser: (updatedUserData) => set((state) => ({
        user: { ...state.user, ...updatedUserData }
      })),

      getRole: () => {
        const storedData = JSON.parse(localStorage.getItem('auth-storage'))
        const { role } = storedData.state.user
        return role
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

export default useAuthStore
