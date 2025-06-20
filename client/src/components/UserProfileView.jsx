import { Card, Text, Grid, Title, Box, Group,Center, Paper,Stack, ActionIcon , useMantineTheme} from '@mantine/core'
import { Pencil, User, UserRoundPlus } from 'lucide-react'
import SquareImage from './SquareImage'
const ProfileActionButton = ({ text, Icon}) => {

  return <Stack justify="center" align="center">
    <ActionIcon variant="white" size="lg" aria-label="Settings">
      <Icon size={16} />
    </ActionIcon>
    <Text>{text}</Text>
  </Stack>
}
const UserProfileView = ({ user }) => {
  const theme = useMantineTheme();
  const { firstname, lastname, email, role, createddate } = user
  console.log(user)
  if (!user) return <Text>Loading user data...</Text>

  return (<Grid className="full-height top-distance_no-categories">
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{padding: 0}}>
      <Box className="full-height" mt="xl">
        <Stack align="center" justify="center">
          <Title >
            {firstname} {lastname}
          </Title>
          <Text>
            Email: {email}
          </Text>
          <Text>
            Role: {role}
          </Text>
        </Stack>
      </Box>
    </Grid.Col>
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{padding: 0}}>
      <Stack bg={theme.primaryColor} className=" full-height" sx={{color:'primary'}} align="center" justify="center">
        <Box style={{height:'300px', width:'300px'}}>
          <Paper shadow="lg">
            <SquareImage src={user.profileimageurl} fallbackSrc='/profile_placeholder.png'/>
          </Paper>
        </Box>
        <Group align="center" mt="md">
          <ProfileActionButton text="Edit Profile" Icon={Pencil}/>
          <ProfileActionButton text="Add Photo" Icon={User}/>
          <ProfileActionButton text="Follow People" Icon={UserRoundPlus}/>
        </Group>
      </Stack>
    </Grid.Col>
  </Grid>)
}

export default UserProfileView
