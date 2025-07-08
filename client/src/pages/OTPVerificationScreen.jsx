import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  TextInput,
  Button,
  Alert,
  Center,
  Loader,
  LoadingOverlay
} from '@mantine/core';
import { AlertCircle, MailOpen } from 'lucide-react'
import useAuthStore from '../utils/AuthStore'

const OTPVerificationScreen = () => {
  const { loginUser, verifyOtp, resendOtp } = useAuthStore()

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0)

  const inputRefs = useRef([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl))
    } else {
      setErrorMessage('No email provided for OTP verification.');
    }
  }, [searchParams]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('Text');
    const digits = pastedValue.replace(/\D/g, '').slice(0, 6);

    if (digits.length === 6) {
      setOtp(digits.split(''));
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const otpValue = otp.join('');

    if (otpValue.length === 6) {
      try {
        const result = await verifyOtp(email, otpValue);

        if (result.success) {
          navigate('/', { replace: true });
        } else {
          setErrorMessage(result.message || 'OTP verification failed.');
        }
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred during verification. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Please enter the complete 6-digit OTP.');
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || !email) return;

    setLoading(true);
    setErrorMessage('');
    try {
      const result = await resendOtp(email);
      if (result.success) {
        setResendCooldown(60);
        setErrorMessage('New OTP sent to your email!');
      } else {
        setErrorMessage(result.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Error sending new OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={500} my={40}>
      <Paper p="xl" radius="md" withBorder style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

        <Title align="center" order={2} mb="md">
          Verify Your Account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt="sm" mb="lg">
          We've sent a 6-digit verification code to your email.
        </Text>

        {email && (
          <Center mb="lg">
            <Text size="md" fw={500}>
              <Group gap="xs" align="center">
                <MailOpen size={20} />
                <Text component="span">
                  {email}
                </Text>
              </Group>
            </Text>
          </Center>
        )}

        {errorMessage && (
          <Alert
            icon={<AlertCircle size={16} />} 
            title="Verification Status"
            color={errorMessage.includes('sent') ? 'green' : 'red'}
            variant="light"
            mt="md"
            mb="md"
            radius="md"
          >
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} onPaste={handlePaste}>
          <Group position="center" spacing="sm" mb="xl" justify="space-between">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                styles={{ input: { width: '3rem', height: '3rem', fontSize: '1.5rem', textAlign: 'center' } }}
                size="lg"
                error={errorMessage && true}
              />
            ))}
          </Group>

          <Button
            fullWidth
            mt='xl'
            type='submit'
            color="teal"
            disabled={loading || otp.join('').length !== 6}
          >
            {loading ? <Loader size="sm" color="white" /> : 'Verify OTP'}
          </Button>

          <Text size="sm" align="center" mt="md">
            Didn't receive the code?{' '}
            <Button
              variant="subtle"
              compact
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || loading || !email}
              loading={loading && resendCooldown === 0}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
            </Button>
          </Text>
        </form>
      </Paper>
    </Container>
  );
};

export default OTPVerificationScreen;