// useAppStore.js
import { create } from 'zustand';

const useAppStore = create((set) => ({
  // Search State
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  // User Authentication State
  isLoggedIn: false,
  userInfo: null,
  loginUser: (user) => set({ isLoggedIn: true, userInfo: user }),
  logoutUser: () => set({ isLoggedIn: false, userInfo: null }),

  // Any additional app-wide states can be added here
}));

export default useAppStore;
