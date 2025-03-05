import React from 'react'

const MonumentCard = ({ monument }) => {
  const { name, description, longitude, latitude } = monument

  return (
    <div className="card-border monument-card" style={{position: 'relative'}}>
      <img 
        decoding="async" 
        src="https://lh5.googleusercontent.com/p/AF1QipPARdydXvO2-w-TQfuGh6ceQPhlUSJDaGE4R8gE=w408-h306-k-no" 
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
        <h3>{description}</h3>
        <div>{longitude + '1, ' + latitude}</div>
      </div>
    </div>
  )
}

export default MonumentCard