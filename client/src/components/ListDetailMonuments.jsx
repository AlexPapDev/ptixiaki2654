import { Text, Stack } from '@mantine/core'
import ListMonumentCard from './ListMonumentCard'

const ListDetailMonuments = ({ monuments = [] }) => {
  return (<Stack px="lg" py="lg" gap="sm" >
    <Text>{monuments.length} monuments</Text>
    {monuments.map(monument => 
      <ListMonumentCard key={monument.monumentid} monument={monument} />
    )}
  </Stack>)
}
export default ListDetailMonuments