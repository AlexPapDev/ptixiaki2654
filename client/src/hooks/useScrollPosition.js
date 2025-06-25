import { useEffect, useState, useRef, useCallback } from 'react'

function useScrollPosition(elementRef) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollPosition = elementRef.current
      ? elementRef.current.scrollTop // For a specific element
      : window.scrollY // For the entire window
    setScrollPosition(currentScrollPosition)
  }, [elementRef]) // Dependency on elementRef to recreate if it changes

  useEffect(() => {
    const element = elementRef.current || window
    element.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [elementRef, handleScroll])

  return scrollPosition
}

export default useScrollPosition