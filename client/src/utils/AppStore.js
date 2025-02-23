// useAppStore.js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
      // Search State
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // User Authentication State
      isLoggedIn: false,
      userInfo: null,
      loginUser: (userInfo) => set({ isLoggedIn: true, userInfo }),
      logoutUser: () => set({ isLoggedIn: false, userInfo: null }),

      // Map position
      mapBounds: null,
      setMapBounds: (bounds) => set({ mapBounds: bounds }),

      // clicked spot on the map
      clickedSpot: null,
      setClickedSpot: (clickedSpot) => set({ clickedSpot: clickedSpot }),
    }),
    {
      name: 'monuma-storage',
      partialize: (state) => ({ 
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
      }),
    }
  ))

export default useAppStore;
