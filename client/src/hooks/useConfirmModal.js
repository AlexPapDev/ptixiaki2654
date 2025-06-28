import { useModals } from '@mantine/modals'

export default function useConfirmModal() {
  const modals = useModals()

  const openConfirm = ({ title, message, labels = {}, onConfirm, onCancel, children }) => {
    modals.openConfirmModal({
      title: title || 'Are you sure?',
      centered: true,
      children,
      labels: {
        confirm: labels.confirm || 'Confirm',
        cancel: labels.cancel || 'Cancel',
      },
      confirmProps: { color: 'red' },
      onConfirm,
      onCancel,
    })
  }

  return { openConfirm }
}
