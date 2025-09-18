import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Divider,
  Link as MuiLink,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Apple as AppleIcon } from '@mui/icons-material';
import { Business, Security, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TeamCollaborationIcon } from '../../components/common/HiringIllustrations';

type SignupMethod = 'email' | 'phone';

interface SignupFormData {
  firstName: string;
  lastName: string;
  credential: string;
  password: string;
  confirmPassword: string;
  company?: string;
  agreeToTerms: boolean;
}

const SignupPage: React.FC = () => {
  const [method, setMethod] = useState<SignupMethod>('email');
  const { control, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>();

  const handleMethodChange = (event: React.SyntheticEvent, newMethod: SignupMethod) => {
    setMethod(newMethod);
  };

  const onSubmit = (data: SignupFormData) => {
    // In a real app, you would handle the signup logic here
    console.log(data);
    alert(`Creating account with ${method}: ${data.credential}`);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3,
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Branding and Features */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ color: 'white', mb: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Join TalentFlow
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Start building your dream team with our powerful recruitment platform
                </Typography>
                
                {/* Feature highlights */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Business sx={{ fontSize: 32, opacity: 0.8 }} />
                    <Typography variant="body1">
                      Post unlimited jobs and manage applications
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
                    <Typography variant="body1">
                      Advanced analytics and hiring insights
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Security sx={{ fontSize: 32, opacity: 0.8 }} />
                    <Typography variant="body1">
                      Enterprise-grade security and compliance
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <TeamCollaborationIcon sx={{ fontSize: 200, opacity: 0.6 }} />
            </motion.div>
          </Grid>

          {/* Right side - Signup Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper
                elevation={10}
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                    Create Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Already have an account?{' '}
                    <MuiLink 
                      component={Link} 
                      to="/login" 
                      underline="hover"
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        '&:hover': { color: 'primary.dark' }
                      }}
                    >
                      Sign In
                    </MuiLink>
                  </Typography>
                </motion.div>

                <Box sx={{ width: '100%', mt: 4 }}>
                  <Tabs 
                    value={method} 
                    onChange={handleMethodChange} 
                    variant="fullWidth" 
                    sx={{ 
                      mb: 3,
                      '& .MuiTab-root': {
                        fontWeight: 'bold',
                        textTransform: 'none',
                      }
                    }}
                  >
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
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'First name is required' }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="First Name"
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message as string}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                  }
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Last name is required' }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Last Name"
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message as string}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                  }
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Controller
                        name="company"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Company name is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Company Name"
                            error={!!errors.company}
                            helperText={errors.company?.message as string}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              }
                            }}
                          />
                        )}
                      />

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
                            label={method === 'email' ? 'Work Email' : 'Phone Number'}
                            autoComplete={method === 'email' ? 'email' : 'tel'}
                            error={!!errors.credential}
                            helperText={errors.credential?.message as string}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              }
                            }}
                          />
                        )}
                      />

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: 'Password is required',
                              minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                type="password"
                                label="Password"
                                error={!!errors.password}
                                helperText={errors.password?.message as string}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                  }
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: 'Please confirm your password',
                              validate: (value) => value === watch('password') || 'Passwords do not match',
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message as string}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                  }
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Controller
                        name="agreeToTerms"
                        control={control}
                        defaultValue={false}
                        rules={{ required: 'You must agree to the terms and conditions' }}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...field}
                                checked={field.value}
                                sx={{
                                  '&.Mui-checked': {
                                    color: 'primary.main',
                                  }
                                }}
                              />
                            }
                            label={
                              <Typography variant="body2" color="text.secondary">
                                I agree to the{' '}
                                <MuiLink href="#" sx={{ color: 'primary.main' }}>Terms of Service</MuiLink>
                                {' '}and{' '}
                                <MuiLink href="#" sx={{ color: 'primary.main' }}>Privacy Policy</MuiLink>
                              </Typography>
                            }
                            sx={{ mt: 2, alignItems: 'flex-start' }}
                          />
                        )}
                      />
                      {errors.agreeToTerms && (
                        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                          {errors.agreeToTerms.message as string}
                        </Typography>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                          mt: 3, 
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 'bold',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: 4,
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        Create Account
                      </Button>
                    </form>
                  </motion.div>
                </Box>

                <Divider sx={{ width: '100%', my: 3, opacity: 0.7 }}>or</Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<GoogleIcon />} 
                    sx={{ 
                      justifyContent: 'center',
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Continue with Google
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<FacebookIcon />} 
                    sx={{ 
                      justifyContent: 'center',
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        borderColor: '#1877f2',
                        color: '#1877f2',
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Continue with Facebook
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<AppleIcon />} 
                    sx={{ 
                      justifyContent: 'center',
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        borderColor: 'black',
                        color: 'black',
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Continue with Apple
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;