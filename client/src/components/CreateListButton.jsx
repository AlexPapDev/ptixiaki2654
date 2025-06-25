import React from 'react'
import { Button } from '@mantine/core'
import { useModals } from '@mantine/modals'
import CreateListModal from './CreateListModal'

const CreateListButton = ({loggedIn = false}) => {
  const modals = useModals()

  const openCreateListModal = () => {
    const id = modals.openModal({
      title: 'Create New List',
      centered: true,
      children: <CreateListModal close={() => modals.closeModal(id)}/>,
    })
  }
  return (
    <Button size="xs" onClick={openCreateListModal} disabled={!loggedIn}>
      Create a list
    </Button>
  )
}

export default CreateListButton