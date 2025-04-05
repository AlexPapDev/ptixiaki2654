import { Card, Text, Image, Group } from '@mantine/core'

const UserProfileView = ({ user }) => {
  if (!user) return <Text>Loading user data...</Text>

  return (
    <Card shadow="sm" padding="lg">
      <Group position="center" style={{ marginBottom: '20px' }}>
        <Image
          src={user.profileimageurl || '/profile_placeholder.png'}
          alt="Profile Picture"
          width={120}
          height={120}
          radius="full"
        />
      </Group>
      <Text align="center" size="xl" weight={500}>
        {user.firstname} {user.lastname}
      </Text>
      <Text align="center" color="dimmed" size="sm" style={{ marginBottom: '10px' }}>
        {user.email}
      </Text>
      <Text size="sm">Role: {user.role}</Text>
    </Card>
  )
}

export default UserProfileView
