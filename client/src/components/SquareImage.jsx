import React from 'react'
import { Image } from '@mantine/core'

const SquareImage = ({ src, alt = "Image" }) => (
  <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '8px' }}>
    <Image
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  </div>
)
export default SquareImage
