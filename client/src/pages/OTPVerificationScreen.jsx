import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../utils/AuthStore'

const OTPVerificationScreen = () => {
  const { loginUser, verifyOtp } = useAuthStore()

  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRefs = useRef([])

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  // Get the email parameter from the URL query string
  useEffect(() => {
    const emailFromUrl = searchParams.get('email')
    if (emailFromUrl) {
      
      setEmail(emailFromUrl)
    }
  }, [searchParams])

  const handleChange = (index, event) => {
    const value = event.target.value
    if (!/^\d?$/.test(value)) return // Allow only a single digit

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to the next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('Text')
    const digits = pastedValue.replace(/\D/g, '').slice(0, 6) // Get only numbers and limit to 6 digits

    if (digits.length === 6) {
      setOtp(digits.split(''))
    }
    e.preventDefault() // Prevent the default paste action
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')

    // Check if the OTP has a length of 6
    if (otpValue.length === 6) {
      try {
        const result = await verifyOtp(email, otpValue)
        
        if (result.success) {
          const { user, token } = result
          loginUser({ user, token })
          navigate('/')
        } else {
          // Handle the error case
          setErrorMessage(result.message)
        }
      } catch (error) {
        // Handle Axios error or network error
        setErrorMessage('An error occurred. Please try again.')
      }
    } else {
      setErrorMessage('Please enter the complete OTP.')
    }
  }

  return (
    <div>
      <h2>Enter OTP</h2>
      <p>We sent a code to your email</p>

      {/* Display email from URL */}
      {email && (
        <p>Email associated with this OTP: <strong>{email}</strong></p>
      )}

      {/* Display error message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} onPaste={handlePaste}>
        <div>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type='text'
              inputMode='numeric'
              maxLength='1'
              value={digit}
              style={{width: '2rem'}}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button type='submit'>Verify OTP</button>
      </form>
    </div>
  )
}

export default OTPVerificationScreen
