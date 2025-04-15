import React from 'react'
import { Image, AspectRatio } from '@mantine/core'

const SquareImage = ({ src, alt = "Image" }) => (
  <AspectRatio>
    <Image
      src={src}
      alt={alt}
      style={{
        // width: '100%',
        // height: '100%',
        // objectFit: 'cover',
        // display: 'block',
      }}
    />
  </AspectRatio>
)
export default SquareImage
