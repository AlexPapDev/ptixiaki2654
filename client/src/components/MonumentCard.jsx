import React from 'react'
import { Link } from 'react-router-dom'

const MonumentCard = ({ monument }) => {
  const { monumentid, name, description, address, images, categories } = monument
  const road = address?.road || 'Unknown Road'
  const houseNumber = address?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()
  const image = images?.[0] || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000'

  return (
    <Link to={`/monuments/${monumentid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        className='card-border monument-card' 
        style={{
          position: 'relative', 
          overflow: 'hidden', 
          cursor: 'pointer', 
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{ height: '40%' }}>
          <img 
            alt='monument' 
            decoding='async' 
            src={image}
            style={{
              position: 'absolute', 
              top: '0', 
              left: '0', 
              width: '100%', 
              height: '40%', 
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{ padding: '10px', textAlign: 'left' }}>
          <p className="text_large bold600">{name}</p>
          <p className="text_medium bold500" style={{ color: 'grey' }}>{description}</p>
          <p className="text_medium bold500">{fullStreetName}</p>
          <div style={{ display: 'flex', paddingTop: '5px', flexWrap: 'wrap', gap: '5px' }}>
            {categories?.slice(0, 6).map((category, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'grey', 
                  color: 'white', 
                  padding: '3px 8px', 
                  borderRadius: '10px', 
                  fontSize: '12px'
                }} 
                className="category-pill"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MonumentCard
