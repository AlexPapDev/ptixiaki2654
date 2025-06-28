import {
  Box,
  Drawer,
  Divider,
  ScrollArea,
} from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'
import NavLinks from './NavLinks'
import { useMediaQuery } from '@mantine/hooks'
import { useMantineTheme } from '@mantine/core'

const NavDrawer = ({drawerOpened, closeDrawer}) => {
  const theme = useMantineTheme()

  const isMdOrBigger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)

  return (<>
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      title="Menu"
      padding="md"
      size="md"
    >
      <ScrollArea>
        <Box mb="lg">
          <SearchInput />
        </Box>

        <Divider mb="md" />

        <Box mb="lg">
          <NavLinks direction="column" align="flex-start" onClose={closeDrawer} />
        </Box>

        <Divider mb="md" />

        <Box>
          <ProfileNav direction="column" align="flex-start" onClose={closeDrawer} />
        </Box>
      </ScrollArea>
    </Drawer>
  </>)
}

export default NavDrawer