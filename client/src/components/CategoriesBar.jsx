import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CategoriesBar = ({ categories = [] }) => {
  const location = useLocation()

  return (
    <nav className="category-bar" id="navbar-secondary">
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center' }}>
        {categories.map((category) => {
          // Get existing search params
          const searchParams = new URLSearchParams(location.search)
          
          // Set (or update) 'cat' param without removing others
          searchParams.set('cat', category)

          return (
            <li key={category} className="category-item">
              <Link to={`/monuments/?${searchParams.toString()}`}>
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
