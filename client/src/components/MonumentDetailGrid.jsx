import React from 'react'
import { Grid, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import { Gallery } from "react-grid-gallery"
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const MonumentDetailGrid = ({ images }) => {
  // const imageUrls = getCloudinaryUrl(images, { width: 1000 })
  const imageUrls = [
    DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE
  ]
  return (
    <Box mt="md" sx={(theme) => ({
      width: '100%',
    })}>
      <Grid style={{ borderRadius: '10px', maxHeight: 'calc(60vh - 64px) !important', height: '100%', width: '100%' }}>
        <Grid.Col span={6} style={{ maxHeight: 'calc(60vh - 64px) !important' }}>
          <Image
            src={imageUrls[0]}
            alt="Main"
            radius="md"
            style={{
              height: '100%',
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={6}>
              <Image
                src={imageUrls[0]}
                alt="Thumbnail 1"
                radius="md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col >
            <Grid.Col span={6}>
              <Image
                src={imageUrls[0]}
                alt="Thumbnail 2"
                radius="md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={imageUrls[0]}
                alt="Thumbnail 1"
                radius="md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={imageUrls[0]}
                alt="Thumbnail 2"
                radius="md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default MonumentDetailGrid
