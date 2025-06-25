// src/contexts/ScrollContext.jsx
import React, { createContext, useState, useEffect, useRef } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

export const ScrollContext = createContext({
  isScrolledPastThreshold: false,
  scrollPosition: 0,
  textInputTopOffset: null, // New: to store the TextInput's top offset from its scroll container
  mainScrollRef: null, // New: a ref for the main scrollable area (AppShell.Main)
});

export function ScrollProvider({ children, threshold = 100 }) {
  const mainScrollRef = useRef(null); // Ref for the main scrollable area (AppShell.Main)
  const scrollPosition = useScrollPosition(mainScrollRef); // Hook now monitors mainScrollRef
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);
  const [textInputTopOffset, setTextInputTopOffset] = useState(null); // State for TextInput's position

  useEffect(() => {
    setIsScrolledPastThreshold(scrollPosition > threshold)
  }, [scrollPosition, threshold]);

  const value = {
    isScrolledPastThreshold,
    scrollPosition,
    textInputTopOffset,
    setTextInputTopOffset, // Allow Home component to set this
    mainScrollRef, // Expose the ref to attach to AppShell.Main
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}