import { Grid, Image,Box, AspectRatio } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import { DEFAULT_IMAGE } from '../utils/constants'

const MonumentDetailGrid = ({ images = [] }) => {
  const imageUrls = [...getCloudinaryUrl(images, { width: 1000 }), ...Array(Math.max(0, 5 - images.length)).fill(DEFAULT_IMAGE)]
  return (
    <Box mt="md" className="test-box" style={{
      width: '100%',
      // height: 'calc(60vh - 64px)',
    }}>
      <Grid padding="none" className="grid-test" gutter="xs" type="media" style={{ borderRadius: '10px', maxHeight: 'calc(60vh - 64px)', height: '100%', width: '100%' }}>
        <Grid.Col span={6} style={{ maxHeight: 'calc(60vh - 64px)' }}>
          <AspectRatio ratio={462 / 358}
            ><Image
              src={imageUrls[0]}
              alt="Main"
              radius="md"
              style={{
                height: '100%',
              }}
            />
          </AspectRatio>
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
