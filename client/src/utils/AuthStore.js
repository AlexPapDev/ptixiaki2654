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

      getUser: () => {
        if (get().isLoggedIn()) {
          return get().user
        }
        return null
      },

      isLoggedIn: () => {
        const token = get().token
        if (token) {
          try {
            const decoded = jwtDecode(token)
            return decoded.exp * 1000 > Date.now()
          } catch (error) {
            console.error("Error decoding token:", error)
            return false
          }
        }
        return false
      },

      loginUser: async (email, password) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/api/users/login`,
            { email, password }, 
            { headers: { 'ngrok-skip-browser-warning': true }}
          )
          const { token, user } = res.data

          localStorage.setItem('token', token)
          set({ user, token })
          return { success: true, user }
        } catch (err) {
          return { success: false, message: err.response?.data?.error || 'Login failed' }
        }
      },

      verifyOtp: async (email, otp) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/api/users/validate-otp`,
            { email, otp }, 
            { headers: { 'ngrok-skip-browser-warning': true }}
          )
          const { token, user } = res.data.data

          localStorage.setItem('token', token)
          set({ user, token })

          return { success: true, user }
        } catch (err) {
          return { success: false, message: err.response?.data?.error || 'OTP verification failed' }
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
        const { user } = get()
        return user?.role || null
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: (state) => {
        console.log("onRehydrateStorage initiated. State being rehydrated:", state)

        if (state && state.token) {
          try {
            const decoded = jwtDecode(state.token)
            if (decoded.exp * 1000 < Date.now()) {
              console.log("Persisted token expired during rehydration. Logging out automatically.")
              return (currentState) => {
                currentState.logoutUser()
              }
            }
          } catch (error) {
            console.error("Error decoding persisted token during rehydration. Logging out.", error)
            return (currentState) => {
              currentState.logoutUser()
            }
          }
        }
      },
    }
  )
)

export default useAuthStore
