import {
  SimpleGrid,
  AspectRatio,
  Stack,
  Image,
  Box,
} from "@mantine/core";
import { getCloudinaryUrl } from "../utils/helpers"
import { DEFAULT_IMAGE } from "../utils/constants"

const ListDetailGrid = ({ images }) => {
  const imageUrls = [
    ...getCloudinaryUrl(images, { width: 1000 }),
    ...Array(Math.max(0, 5 - images.length)).fill(DEFAULT_IMAGE),
  ];

  return (
    <Box className="test-box">
      <SimpleGrid
        cols={2}
        spacing="none"
        verticalSpacing="none"
        padding="none"
        className="grid-test"
        gutter="xs"
        type="media"
        style={{
          maxHeight: "calc(60vh - 64px)",
          height: "100%",
          width: "100%",
        }}
      >
        <div padding="none" span={6} style={{ maxHeight: "calc(60vh - 64px)" }}>
          <AspectRatio ratio={462 / 358}>
            <Image
              src={imageUrls[0]}
              alt="Main"
              // radius="md"
              style={{
                height: "100%",
              }}
            />
          </AspectRatio>
        </div>
        <Stack span={6}>
          <SimpleGrid
            cols={2}
            spacing="none"
            verticalSpacing="none"
            padding="none"
            gutter="none"
            type="media"
          >
            <div span={6} padding="none" gutter="xs">
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[1]}
                  alt="Thumbnail 1"
                  // radius="md"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </AspectRatio>
            </div>
            <div span={6} padding="none">
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[2]}
                  alt="Thumbnail 2"
                  // radius="md"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </AspectRatio>
            </div>
            <div span={6} padding="none">
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[3]}
                  alt="Thumbnail 1"
                  // radius="md"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </AspectRatio>
            </div>
            <div span={6}>
              <AspectRatio ratio={462 / 358}>
                <Image
                  src={imageUrls[4]}
                  alt="Thumbnail 2"
                  // radius="md"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </AspectRatio>
            </div>
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};
export default ListDetailGrid;
