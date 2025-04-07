import { Card, Text, Image, Group, Stack, ActionIcon } from '@mantine/core'
import { Pencil, User, UserRoundPlus } from 'lucide-react'

const ProfileActionButton = ({ text, Icon}) => {
  return <Stack justify="center" align="center">
    <ActionIcon variant="filled" aria-label="Settings">
      <Icon size={16} />
    </ActionIcon>
    <Text>{text}</Text>
  </Stack>
}
const UserProfileView = ({ user }) => {
  if (!user) return <Text>Loading user data...</Text>

  return (<>
      <Group style={{ marginBottom: '20px' }}>
        <Stack>
          <Card>
            <Image
              src={user.profileimageurl || '/profile_placeholder.png'}
              alt="Profile Picture"
              width={120}
              height={120}
              radius="full"
            />
            <Text align="center" size="xl" weight={500}>
            {user.firstname} {user.lastname}
            </Text>
            <Group align="center">
              <ProfileActionButton text="Edit Profile" Icon={Pencil}/>
              <ProfileActionButton text="Add Photo" Icon={User}/>
              <ProfileActionButton text="Follow People" Icon={UserRoundPlus}/>
            </Group>
            {/* here should go any list items */}
          </Card>
        </Stack>
      </Group>
      
      <Text align="center" color="dimmed" size="sm" style={{ marginBottom: '10px' }}>
        {user.email}
      </Text>
      <Text size="sm">Role: {user.role}</Text>
  </>)
}

export default UserProfileView
