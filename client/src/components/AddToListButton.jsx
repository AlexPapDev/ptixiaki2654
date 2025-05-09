import React from 'react'
import { Button } from '@mantine/core'
import { useModals } from '@mantine/modals'
import AddToListModal from './AddToListModal'
import { Bookmark } from 'lucide-react'
import useDataStore from '../utils/DataStore'
const AddToListButton = ({loggedIn = false, monumentId}) => {
  const modals = useModals()
  const { getUserLists } = useDataStore()

  const openAddToListModal = async () => {
    const lists = await getUserLists()
    modals.openModal({
      // title: 'Add Monument To List',
      centered: true,
      children: <AddToListModal lists={lists} monumentId={monumentId}/>,
    })
  }
  return (
    <Button color="teal" leftSection={<Bookmark size={14} />} onClick={openAddToListModal}>
      Save
    </Button>
  )
}

export default AddToListButton