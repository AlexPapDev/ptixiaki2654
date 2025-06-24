import { useState } from 'react'
import { Breadcrumbs, Anchor, Text, Title } from '@mantine/core';
const MonumentEras = ({ monumenteras = [] }) => {
  const [currentEra, setCurrentEra] = useState(monumenteras[0].eraName)
  const eraToDescription = monumenteras.reduce((acc, curr) => ({
    ...acc,
    [curr.eraName]: curr.eraMonumentDescription,
  }) , {})

  const items = monumenteras.sort((a, b) => a.eraOrder - b.eraOrder).map((item, index) => (
    <Anchor href={item.href} key={index} onClick={() => {setCurrentEra(item.eraName)}} 
      underline={item.eraName === currentEra ? 'always' : 'hover'}>
      {item.eraName}
    </Anchor>
  ))
  debugger
  console.log(eraToDescription, currentEra)
  return <>
    <Title order={3}>Eras</Title>
    <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
      {items}
    </Breadcrumbs>
    <Text style={{ whiteSpace: 'pre-wrap' }} mt="sm">{eraToDescription[currentEra]}</Text>
  </>
}
export default MonumentEras