import React from 'react'
import { Title, Text, Container, Center } from '@mantine/core'

const NewMonumentMap = ({handleMarkerDragEnd, lat, lng}) => {
  return (<>
    <Title>Καλώς ήρθατε στην Ιστορία της Θεσσαλονίκης!</Title>
    <Text>Εξερευνήστε τα μνημεία της πόλης και ανακαλύψτε τα μυστικά τους. Αναζητήστε, δημιουργήστε τις δικές σας λίστες, επεξεργαστείτε πληροφορίες και αλληλεπιδράστε με την πλούσια κληρονομιά της Θεσσαλονίκης. Ξεκινήστε το ταξίδι σας στην ιστορία τώρα!</Text>
  </>)
}
export default NewMonumentMap