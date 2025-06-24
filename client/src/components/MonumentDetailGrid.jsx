import React from 'react'
import { Grid, Group, Image,Box, AspectRatio } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import { Gallery } from "react-grid-gallery"
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const MonumentDetailGrid = ({ images = [] }) => {
  // const images = getCloudinaryUrl(images, { width: 1000 })
  const imageUrls = [...getCloudinaryUrl(images, { width: 1000 }), ...Array(Math.max(0, 5 - images.length)).fill(DEFAULT_IMAGE)]
  return (
    <Box mt="md" className="test-box" style={{
      width: '100%',
      height: 'calc(60vh - 64px)',
    }}>
      <Grid padding="none" className="grid-test" gutter="xs" type="media" style={{ borderRadius: '10px', maxHeight: 'calc(60vh - 64px)', height: '100%', width: '100%' }}>
        <Grid.Col span={6} style={{ maxHeight: 'calc(60vh - 64px)' }}>
          <Image
            src={imageUrls[0]}
            alt="Main"
            radius="md"
            style={{
              height: '100%',
            }}
          />
        </Grid.Col>
        <Grid.Col span={6} style={{ maxHeight: 'calc(60vh - 64px)' }}>
          <Grid padding="none" gutter="none" type="media" style={{ maxHeight: 'calc(60vh - 64px)' }}>
            <Grid.Col span={6} padding="none" gutter="xs">
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[1]}
                  alt="Thumbnail 1"
                  radius="md"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
            </Grid.Col >
            <Grid.Col span={6} padding="none">
              <AspectRatio ratio={462 / 358}>
              <Image
                src={imageUrls[2]}
                alt="Thumbnail 2"
                radius="md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[3]}
                  alt="Thumbnail 1"
                  radius="md"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[4]}
                  alt="Thumbnail 2"
                  radius="md"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default MonumentDetailGrid
