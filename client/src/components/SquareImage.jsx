import { Image, AspectRatio } from '@mantine/core'

const SquareImage = ({ src, alt = "Image", fallbackSrc, height, radius, outerStyle = {} }) => (
  <AspectRatio style={outerStyle}>
    <Image
      src={src}
      alt={alt}
      fallbackSrc={fallbackSrc}
      height={height}
      radius={radius}
    />
  </AspectRatio>
)
export default SquareImage
