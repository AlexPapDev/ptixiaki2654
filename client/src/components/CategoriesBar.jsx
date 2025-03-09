import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesBar = ({categories = []}) => {

  return (
    <nav className="category-bar" id="navbar-secondary">
      <ul style={{display:'flex', flexDirection:'row', gap: '1em', justifyContent: 'center'}}>
        {categories.map(category => 
          <li className="category-item"><Link 
            to={{
              pathname: "/monuments/",
              search: `?cat=${category}`,
            }}>
            {category}
          </Link></li>
        )}
      </ul>
    </nav>
  )
}

export default CategoriesBar
