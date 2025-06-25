import { useEffect } from 'react'
import { Divider, Text, Grid, Title, Box, Group, Container, Paper, Stack, ActionIcon,FileInput, FileButton, useMantineTheme } from '@mantine/core'
import { Pencil, User, UserRoundPlus } from 'lucide-react'
import SquareImage from './SquareImage'
import FollowingLists from './FollowingLists'
import { toast } from 'react-toastify'
import useAddPhoto from '../hooks/useAddPhoto' // Adjust path as needed
import { useFileDialog } from '@mantine/hooks'
import { getCloudinaryUrl } from '../utils/helpers'
const ProfileActionButton = ({ text, Icon, onClick }) => {
  return (
    <Stack justify="center" align="center">
      <ActionIcon variant="white" size="lg" aria-label={text} onClick={onClick}>
        <Icon size={16} />
      </ActionIcon>
      <Text>{text}</Text>
    </Stack>
  )
}

const UserProfileView = ({ user }) => {
  const theme = useMantineTheme()
  const fileDialog = useFileDialog()
  const imageSrc = getCloudinaryUrl(user.profileimageurl)

  const { addProfilePhoto } = useAddPhoto(user.userid, () => {
    toast.success('Photo added succesfully  successfully!', { position: 'top-right' })
    window.location.reload()
  })

  useEffect(() => {
    const addPhoto = async () => {
      if (fileDialog.files?.length > 0) {
        const result = await addProfilePhoto(fileDialog.files)
        debugger
        console.log(result)
        fileDialog.reset()
      }
    }

    addPhoto()
  }, [fileDialog?.files, addProfilePhoto, fileDialog]); 

  if (!user) return <Text>Loading user data...</Text>

  const { firstname, lastname, email, role, createddate } = user

  return (
    <Grid className="full-height">
      <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{ padding: 0 }}>
        <Box mt="xl">
          <Stack align="center" justify="center" my="xl">
            <Title>
              {firstname} {lastname}
            </Title>
            <Text>Email: {email}</Text>
            <Text>Role: {role}</Text>
          </Stack>
          <Container size="xs">
            <Title order={4} mb="md">User's lists:</Title>
            <FollowingLists hideSearch={true} />
            <Divider my="md" />
            <Title order={4} mb="md">User's followed lists:</Title>
            <FollowingLists hideSearch={true} />
          </Container>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{ padding: 0 }} className="profile-height">
        <Stack bg={theme.primaryColor} sx={{ color: 'primary' }} align="center" justify="center" className="profile-height">
          <Box style={{ height: '300px', width: '300px' }}>
            <Paper shadow="lg">
              <SquareImage src={imageSrc} fallbackSrc='/profile_placeholder.png' />
            </Paper>
          </Box>
          <Group align="center" mt="md">
            <ProfileActionButton text="Edit Profile" Icon={Pencil} />
            <ProfileActionButton text="Add Photo" Icon={User} onClick={fileDialog.open} />
            <ProfileActionButton text="Follow People" Icon={UserRoundPlus} />
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default UserProfileView