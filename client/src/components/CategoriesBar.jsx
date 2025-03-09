import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAppStore from '../utils/AppStore'

const CategoriesBar = ({ categories = [] }) => {
  const location = useLocation()
  // todo: maybe delete this later
  const { setSearchTerm } = useAppStore()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const activeCategory = searchParams.get('cat')

  // Function to clear all query parameters
  const clearFilters = () => {
    setSearchTerm(null)
    navigate('/monuments/') // Navigate to /monuments/ without query params
  }

  return (
    <nav className="category-bar" id="navbar-secondary">
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center', paddingTop: '5px' }}>
        {categories.map((category) => {
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

        <button onClick={clearFilters} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Clear Filters
        </button>

    </nav>
  )
}

export default CategoriesBar
