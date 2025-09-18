import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Divider,
  Tabs,
  Tab,
  Link as MuiLink,
} from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Apple as AppleIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';

type LoginMethod = 'email' | 'phone';

const LoginPage: React.FC = () => {
  const [method, setMethod] = useState<LoginMethod>('email');
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleMethodChange = (event: React.SyntheticEvent, newMethod: LoginMethod) => {
    setMethod(newMethod);
  };

  const onSubmit = (data: any) => {
    // In a real app, you would handle the login logic here
    console.log(data);
    alert(`Logging in with ${method}: ${data.credential}`);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'transparent'
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Log In
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Don't have an account?{' '}
            <MuiLink href="#" underline="hover">
              Sign Up
            </MuiLink>
          </Typography>
        </motion.div>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Tabs value={method} onChange={handleMethodChange} variant="fullWidth" sx={{ mb: 2 }}>
            <Tab label="Email" value="email" />
            <Tab label="Phone Number" value="phone" />
          </Tabs>

          <motion.div
            key={method}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="credential"
                control={control}
                defaultValue=""
                rules={{
                  required: `${method === 'email' ? 'Email' : 'Phone number'} is required`,
                  pattern: {
                    value: method === 'email' ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i : /^[0-9]{10}$/,
                    message: `Invalid ${method === 'email' ? 'email address' : 'phone number'}`,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label={method === 'email' ? 'Email' : 'Phone Number'}
                    autoComplete={method === 'email' ? 'email' : 'tel'}
                    error={!!errors.credential}
                    helperText={errors.credential?.message as string}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.5 }}
              >
                Continue with {method === 'email' ? 'Email' : 'Phone'}
              </Button>
            </form>
          </motion.div>
        </Box>

        <Divider sx={{ width: '100%', my: 3 }}>or</Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ justifyContent: 'center' }}>
            Continue with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ justifyContent: 'center' }}>
            Continue with Facebook
          </Button>
          <Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ justifyContent: 'center' }}>
            Continue with Apple
          </Button>
        </Box>

         <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 4 }}>
            By continuing, you agree to our <MuiLink href="#">Terms of Use</MuiLink> and <MuiLink href="#">Privacy Policy</MuiLink>.
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
