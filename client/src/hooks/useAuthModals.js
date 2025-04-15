import { useModals } from '@mantine/modals'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function useAuthModals () {
  const modals = useModals()

  const openLoginModal = () => {
    const id = modals.openModal({
      title: 'Login',
      centered: true,
      children: <Login onClose={() => modals.closeModal(id)}/>,
    })
    return id
  }

  const openSignUpModal = () => {
    const id = modals.openModal({
      title: 'Sign Up',
      centered: true,
      children: <SignUp onClose={() => modals.closeModal(id)}/>,
    })
    return id
  }

  return { openLoginModal, openSignUpModal }
}
