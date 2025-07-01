import { useModals } from '@mantine/modals'

export default function useAuthModals() {
    const modals = useModals()

    const openModalWithComponent = (Component, title = '', props = {}) => {
        const id = modals.openModal({
            title,
            centered: true,
            children: < Component {...props }
            onClose = {
                () => modals.closeModal(id) }
            />,
        })
        return id
    }

    // For backward compatibility
    const openLoginModal = () => openModalWithComponent(require('../components/Login').default, 'Login')
    const openSignUpModal = () => openModalWithComponent(require('../components/SignUp').default, 'Sign Up')

    return { openLoginModal, openSignUpModal, openModalWithComponent }
}