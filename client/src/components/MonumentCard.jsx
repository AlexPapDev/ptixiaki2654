import React from 'react'

const MonumentCard = ({ monument }) => {
  const { name, description, address: { road, house_number }, images, categories } = monument
  const fullStreetName = `${road} ${house_number || ''}`
  const image = images[0] || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000'
  return (
    <div className='card-border monument-card' style={{position: 'relative'}}>
      <img 
        alt='monument-image'
        decoding='async' 
        src={image}
        style={{
          position: 'absolute', 
          top: '0',
          left: '0',
          width: '100%', 
          height: '40%',
          objectFit: 'cover', // Ensure the image covers the space without distortion
        }}>
      </img>
      <div style={{ paddingTop: '42%', paddingLeft: '10px', textAlign: 'left' }}>
        <h1>{name}</h1>
        <h5 style={{color: 'grey'}}>{description}</h5>
        <h5>{fullStreetName}</h5>
      </div>
      <div style={{display: 'flex', paddingLeft: '10px', marginTop: '4px', flexWrap: 'wrap', gap: '5px'}}>
        {categories.slice(0, 6).map(categoryName => <div style={{backgroundColor: 'grey', color: 'white', padding: '3px 8px 3px 8px', borderRadius: '10px', fontSize: '12px'}} className="category-pill">{categoryName}</div>)}
      </div>
    </div>
  )
}

export default MonumentCard