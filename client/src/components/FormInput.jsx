import { TextInput, PasswordInput } from '@mantine/core'

const FormInput = ({ label, name, value, onChange, type = 'text', ...props }) => {
  const InputComponent = type === 'password' ? PasswordInput : TextInput
  return (
    <InputComponent
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required
      {...props}
    />
  )
}

export default FormInput 