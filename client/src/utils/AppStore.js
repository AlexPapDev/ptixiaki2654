// useAppStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create((set) => ({
  // Search State
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  // User Authentication State
  isLoggedIn: false,
  userInfo: null,
  loginUser: (user) => set({ isLoggedIn: true, userInfo: user }),
  logoutUser: () => set({ isLoggedIn: false, userInfo: null }),

  // Map position
  mapBounds: null,
  setMapBounds: (bounds) => set({ mapBounds: bounds }),
}))

export default useAppStore;
