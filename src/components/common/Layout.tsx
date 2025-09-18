import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Button,
  Stack,
  CssBaseline,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Container,
} from '@mui/material';
import { Work as WorkIcon, People as PeopleIcon, Assignment as AssignmentIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useStore } from '../../store';
import Logo from './Logo';
import NotificationBell from './NotificationBell';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
  { text: 'Assessments', icon: <AssignmentIcon />, path: '/assessments' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Global state for loading indicators and error notifications
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const clearError = useStore((state) => state.clearError);
  
  // Placeholder for authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };
  const handleSignUp = () => navigate('/login');

  // Get current tab value based on location
  const getCurrentTab = () => {
    const currentItem = navItems.find(item => 
      location.pathname === item.path || 
      (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
    );
    return currentItem ? navItems.indexOf(currentItem) : 0;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(navItems[newValue].path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 0 } }}>
            {/* Logo */}
            <Box sx={{ mr: 4 }}>
              <Logo />
            </Box>

            {/* Navigation Tabs */}
            <Tabs
              value={getCurrentTab()}
              onChange={handleTabChange}
              sx={{
                flexGrow: 1,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minHeight: 64,
                  px: 3,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              {navItems.map((item, index) => (
                <Tab
                  key={item.text}
                  label={item.text}
                  icon={item.icon}
                  iconPosition="start"
                  sx={{
                    '& .MuiTab-iconWrapper': {
                      mr: 1,
                    },
                  }}
                />
              ))}
            </Tabs>
            
            {/* Right side actions */}
            <Box sx={{ ml: 'auto' }} />
            
            {isLoading && <CircularProgress size={24} color="inherit" sx={{mr: 2}} />}

            <Stack direction="row" spacing={1.5} alignItems="center">
              <NotificationBell />

              {isAuthenticated ? (
                <Button variant="outlined" color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              ) : (
                <>
                  <Button variant="outlined" color="inherit" onClick={handleLogin} sx={{ borderRadius: '20px' }}>
                    Log In
                  </Button>
                  <Button variant="contained" onClick={handleSignUp} sx={{ borderRadius: '20px' }}>
                    Sign Up
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4 }}>
        {children}
      </Box>

      {/* Error notification */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={clearError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;