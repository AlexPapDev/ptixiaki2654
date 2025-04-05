import React from 'react'
import { Grid, Col, Image } from '@mantine/core'

const MonumentDetailGrid = ({ images }) => {
  return (
    <Grid>
      {/* Left side: Takes half the space */}
      <Col span={6}>
        <Image
          src={images[0]}
          alt="Main Image"
          fit="cover"
          height="100%"
        />
      </Col>

      {/* Right side: 2x2 grid */}
      <Col span={6}>
        <Grid>
          <Col span={6}>
            <Image
              src={images[1]}
              alt="Image 1"
              fit="cover"
              height="100%"
            />
          </Col>
          <Col span={6}>
            <Image
              src="https://via.placeholder.com/300x200"
              alt="Image 2"
              fit="cover"
              height="100%"
            />
          </Col>
          <Col span={6}>
            <Image
              src="https://via.placeholder.com/300x200"
              alt="Image 3"
              fit="cover"
              height="100%"
            />
          </Col>
          <Col span={6}>
            <Image
              src="https://via.placeholder.com/300x200"
              alt="Image 4"
              fit="cover"
              height="100%"
            />
          </Col>
        </Grid>
      </Col>
    </Grid>
  )
}

export default MonumentDetailGrid
