import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Stack, Text, Menu, Anchor } from '@mantine/core'
import { ExternalLink } from 'lucide-react'
const ListCard = ({ list }) => {
  const { name: listName, description, monuments = [], user } = list
  const listSize = monuments.length
  return (<>
    <Card>
      <Card.Section>
        <Image
          src={monuments[0].images[0]}
        />
      </Card.Section>
      <Stack>
        <Text>{listName}</Text>
        <Text>{description}</Text>
        <Text>By {user.name}</Text>
      </Stack>
    </Card>
  </>)
}
export default ListCard