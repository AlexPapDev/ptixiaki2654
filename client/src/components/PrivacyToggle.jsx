import { Radio, Group, Loader } from '@mantine/core'

/**
 * Reusable component for toggling privacy settings (public/private).
 * It displays two radio buttons for 'Public' and 'Private' and an optional loader.
 *
 * @param {object} props - The component props.
 * @param {string} props.value - The current selected value ('public' or 'private').
 * @param {function} props.onChange - Callback function when the radio selection changes.
 * @param {boolean} [props.disabled=false] - Whether the radio group should be disabled.
 * @param {boolean} [props.loading=false] - Whether a loading indicator should be shown.
 * @returns {JSX.Element} The PrivacyToggle component.
 */
const PrivacyToggle = ({ value, onChange, disabled = false, loading = false }) => {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      name="privacy-toggle" // Unique name for the radio group
      disabled={disabled}
    >
      <Group mt="xs">
        <Radio value="public" label="Public" disabled={disabled} />
        <Radio value="private" label="Private" disabled={disabled} />
        {loading && <Loader size="xs" ml="sm" />}
      </Group>
    </Radio.Group>
  )
}

export default PrivacyToggle