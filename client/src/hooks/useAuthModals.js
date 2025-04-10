import { useModals } from '@mantine/modals'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function useAuthModals () {
  const modals = useModals()

  const openLoginModal = () =>
    modals.openModal({
      title: 'Login',
      centered: true,
      children: <Login />,
    })

  const openSignUpModal = () =>
    modals.openModal({
      title: 'Sign Up',
      centered: true,
      children: <SignUp />,
    })

  return { openLoginModal, openSignUpModal }
}
