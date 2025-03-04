// useAppStore.js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Search State
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // User Authentication State
      isLoggedIn: () => !!get().token, 
      user: null,
      token: null,
      loginUser: ({ user, token }) => set({ user, token }),
      logoutUser: () => set({ user: false, token: null }),
      updateUser: (updatedUserData) => set((state) => ({
        user: { ...state.user, ...updatedUserData }
      })),

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
        user: state.user,
        token: state.token,
      }),
    }
  ))

export default useAppStore;
