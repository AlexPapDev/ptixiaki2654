import { Button, ActionIcon } from '@mantine/core'
import { useModals } from '@mantine/modals'
import AddToListModal from './AddToListModal'
import CreateListModal from './CreateListModal'
import { Bookmark } from 'lucide-react'
import useDataStore from '../utils/DataStore'
import useAuthStore from '../utils/AuthStore'
import useAuthModals from '../hooks/useAuthModals'
const AddToListButton = ({loggedIn = false, monumentId, isIcon = false}) => {
  const { isLoggedIn } = useAuthStore()
  const { openLoginModal } = useAuthModals()
  const modals = useModals()
  const { getUserLists } = useDataStore()
  
  const openAddToListModal = async () => {
    if (!isLoggedIn()) return openLoginModal()
    const lists = await getUserLists()
    modals.openModal({
      centered: true,
      children: <AddToListModal lists={lists} monumentId={monumentId} openCreateList={openCreateListModal}/>,
    })
  }
  const openCreateListModal = () => {
    const id = modals.openModal({
      title: 'Create New List',
      centered: true,
      children: <CreateListModal close={() => modals.closeModal(id)} suppressNavigate/>,
    })
  }
  return (
    isIcon ?
      <ActionIcon size="lg"  onClick={openAddToListModal}>
        <Bookmark size={20}/>
      </ActionIcon>
    :
      <Button color="teal" leftSection={<Bookmark size={14} />} onClick={openAddToListModal}>
        Save
      </Button>
  )
}

export default AddToListButton