import { useState } from 'react'

const useAuthForm = (initialState) => {
	const [formData, setFormData] = useState(initialState)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value })
	}

	const resetForm = () => {
		setFormData(initialState)
		setErrorMessage('')
	}

	return {
		formData,
		setFormData,
		errorMessage,
		setErrorMessage,
		handleChange,
		resetForm,
	}
}

export default useAuthForm