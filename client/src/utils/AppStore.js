// useAppStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Search State
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // Map position
      mapBounds: null,
      setMapBounds: (bounds) => set({ mapBounds: bounds }),
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
