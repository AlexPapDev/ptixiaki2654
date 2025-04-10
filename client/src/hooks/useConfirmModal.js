import { useModals } from '@mantine/modals'
import { Button, Text } from '@mantine/core'

export default function useConfirmModal() {
  const modals = useModals()

  const openConfirm = ({ title, message, labels = {}, onConfirm, onCancel }) => {
    modals.openConfirmModal({
      title: title || 'Are you sure?',
      centered: true,
      children: (
        <Text size="sm">
          {message || 'This action is permanent. Do you want to continue?'}
        </Text>
      ),
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
