import { useEffect, useState } from 'react'
import { Divider, Text, Grid, Title, Box, Group, Container, Paper, Stack, ActionIcon, FileInput, FileButton, useMantineTheme, TextInput } from '@mantine/core'
import { Pencil, User, UserRoundPlus, Check, X } from 'lucide-react'
import SquareImage from './SquareImage'
import FollowingLists from './FollowingLists'
import { toast } from 'react-toastify'
import useAddPhoto from '../hooks/useAddPhoto' // Adjust path as needed
import { useFileDialog } from '@mantine/hooks'
import { getCloudinaryUrl } from '../utils/helpers'
import useUserStore from '../stores/domain/UserStore'
import EditButton from '../components/EditButton'
import ConfirmButtonIcon from './ConfirmButtonIcon'
import CancelButtonIcon from './CancelButtonIcon'
import useAuthStore from '../utils/AuthStore'
const EditableText = ({ initialValue, label, fieldKey, onSave, canEdit = false }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    // Only save if the value has changed from its initial state
    if (value !== initialValue) {
      await onSave(fieldKey, value);
    }
    setIsEditing(false); // Exit editing mode regardless of save success
  }

  return (
    <Group style={{ position: 'relative', width: '100%', justifyContent: 'flex-start' }} align="center" spacing="xs">
      {isEditing ? (
        <>
          {/* Label for the input field, to maintain context */}
          <Text size="sm" fw={500} style={{ minWidth: '60px' }}>{label}:</Text>
          <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
              if (event.key === 'Escape') {
                setValue(initialValue); // Revert to original value on escape
                setIsEditing(false);
              }
            }}
            placeholder={`Enter new ${label}`}
            size="sm"
            style={{ flexGrow: 1 }}
            autoFocus // Automatically focus the input when in edit mode
          />

          <ConfirmButtonIcon handleSave={handleSave} />
          <CancelButtonIcon onClickCustom={() => { setValue(initialValue); setIsEditing(false); }} />
        </>
      ) : (
        <>
          <Text size="sm" fw={500} style={{ minWidth: '60px' }}>{label}:</Text>
          <Text size="md" style={{ flexGrow: 1 }}>{value}</Text>
          {canEdit && <EditButton onEdit={() => setIsEditing(true)} />}
        </>
      )}
    </Group>
  );
};


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

const UserProfileView = ({ user: profileUser }) => {
  const theme = useMantineTheme()
  const fileDialog = useFileDialog()
  const { user } = useAuthStore()
  const isOwnProfile = user && user?.userid === profileUser?.userid
  const imageSrc = getCloudinaryUrl(profileUser.profileimageurl)

  // Get updateUserProfile from your profileUser store
  const { updateUserProfile } = useUserStore()

  // Callback for updating a single field
  const handleFieldUpdate = async (fieldKey, newValue) => {
    const result = await updateUserProfile(profileUser.userid, { [fieldKey]: newValue });
    if (result.success) {
      toast.success(`${fieldKey} updated successfully!`, { position: 'top-right' });
    } else {
      toast.error(`Failed to update ${fieldKey}: ${result.error}`, { position: 'top-right' });
    }
  };

  const { addProfilePhoto } = useAddPhoto(profileUser.userid, () => {
    toast.success('Photo added successfully!', { position: 'top-right' })
    // Reloading window might be disruptive. Consider updating `currentUser` state directly if possible.
    window.location.reload()
  })

  useEffect(() => {
    const addPhoto = async () => {
      if (fileDialog.files?.length > 0) {
        const result = await addProfilePhoto(fileDialog.files)
        console.log(result)
        fileDialog.reset()
      }
    }

    addPhoto()
  }, [fileDialog?.files, addProfilePhoto, fileDialog])

  if (!profileUser) return <Text>Loading profileUser data...</Text>

  const { firstname, lastname, email, role, createddate } = profileUser

  return (
    <Grid className="full-height" style={{overflow: 'hidden'}}>
      <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{ padding: 0 }}>
        <Container size={480} mt="xl">
          <Stack align="center" justify="center" my="xl">
            <Title order={1} mb="md">Profile Details</Title> {/* General title for the profile section */}

            {/* Editable First Name */}
            <EditableText
              initialValue={firstname}
              label="First Name"
              fieldKey="firstname"
              onSave={handleFieldUpdate}
              canEdit={isOwnProfile}
            />

            {/* Editable Last Name */}
            <EditableText
              initialValue={lastname}
              label="Last Name"
              fieldKey="lastname"
              onSave={handleFieldUpdate}
              canEdit={isOwnProfile}
            />

            {/* Editable Email */}
            <EditableText
              initialValue={email}
              label="Email"
              fieldKey="email"
              onSave={handleFieldUpdate}
              canEdit={isOwnProfile}
            />

            {/* Non-editable fields like Role and Member Since */}
            <Group style={{ justifyContent: 'flex-start', width: '100%' }} spacing="xs">
              <Text size="sm" fw={500} style={{ minWidth: '60px' }}>Role:</Text>
              <Text size="md">{role}</Text>
            </Group>
            <Group style={{ justifyContent: 'flex-start', width: '100%' }} spacing="xs">
              <Text size="sm" fw={500} style={{ minWidth: '60px' }}>Member Since:</Text>
              <Text size="md">{new Date(createddate).toLocaleDateString()}</Text>
            </Group>
          </Stack>

          <Title order={4} mb="md">User's lists:</Title>
          <FollowingLists hideSearch={true} />
          <Divider my="md" />
          <Title order={4} mb="md">User's followed lists:</Title>
          <FollowingLists hideSearch={true} />
        </Container>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{ padding: 0 }} className="profile-height">
        <Stack bg={theme.primaryColor} sx={{ color: 'primary' }} align="center" justify="center" className="profile-height">
          <Box style={{ height: '300px', width: '300px' }}>
            <Paper shadow="lg">
              <SquareImage src={imageSrc} fallbackSrc='/profile_placeholder.png' />
            </Paper>
          </Box>
          <Group align="center" mt="md">
            <ProfileActionButton text="Edit Profile" Icon={Pencil} /> {/* This button might become redundant or change function */}
            <ProfileActionButton text="Add Photo" Icon={User} onClick={fileDialog.open} />
            <ProfileActionButton text="Follow People" Icon={UserRoundPlus} />
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default UserProfileView
