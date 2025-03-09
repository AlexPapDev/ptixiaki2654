import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CategoriesBar = ({ categories = [] }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const activeCategory = searchParams.get('cat')

  return (
    <nav className="category-bar" id="navbar-secondary">
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center' }}>
        {categories.map((category) => {
          // Clone existing search params so we don't modify the original
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('cat', category)

          return (
            <li
              key={category}
              className={`category-item ${activeCategory === category ? 'active' : ''}`}
              style={{
                textShadow: activeCategory === category ? '1px 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
              }}
            >
              <Link to={`/monuments/?${newSearchParams.toString()}`}>
                {category}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoriesBar
