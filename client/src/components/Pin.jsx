import React, { useState } from 'react'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const pinStyle = {
  fill: '#d00',
  stroke: 'white',
  strokeWidth: '1',
}

const hoveredPinStyle = {
  fill: 'white',
  stroke: '#d00',
  strokeWidth: '1',
}

const numberStyle = {
  position: 'absolute',
  top: '0',          // Adjust this as needed to center the number on the SVG
  left: '50%',
  transform: 'translate(-50%, 10%)', // Centering and adjusting vertically
  color: 'white',  // Default color
  width: '20px',     // Size of the circle holding the number
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12.5px',  // Adjust font size as needed
  fontWeight: 'bold',
}

const Pin = ({ size = 30, number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      style={{ cursor: 'pointer' }} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        height={size} 
        viewBox="0 0 24 24" 
        style={isHovered ? hoveredPinStyle : pinStyle} // Conditional styling for SVG
      >
        <path d={ICON} />
      </svg>
      <div 
        style={{ 
          ...numberStyle, 
          color: isHovered ? '#d00' : 'white'  // Conditional color change for the number
        }}
      >
        {number}
      </div>
    </div>
  )
}

export default React.memo(Pin)
