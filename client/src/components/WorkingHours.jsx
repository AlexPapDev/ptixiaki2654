import { Stack, Grid, Text } from '@mantine/core'
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


const StackItem = ({ day, hours, isPublic }) => {
  return (
    <Grid>
      <Grid.Col span={5} py="xs">
        <Text size="sm" weight={500}>{day}</Text>
      </Grid.Col>
      <Grid.Col span={7} py="xs">
        <Text size="sm" color={hours ? 'black' : 'dimmed'}>
          {isPublic 
            ? 'Open 24h Hours'
            : hours || 'Unknown'
          }
        </Text>
      </Grid.Col>
    </Grid>
  )
}
const WorkingHours = ({ hoursPerDay = [], isPublic = false }) => {
  return (
    <Stack>
      <Text fw={600} align="left">Working Hours</Text>
      {daysOfWeek.map((day, idx) => (
        <StackItem key={day} day={day} hours={hoursPerDay[idx]} isPublic={isPublic} />
      ))}
    </Stack>
  )
}
export default WorkingHours