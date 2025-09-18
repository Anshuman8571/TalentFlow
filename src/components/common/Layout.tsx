import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
  Button,
  Stack,
  Divider,
  useTheme,
  IconButton,
  CssBaseline,
  Snackbar,
  Alert
} from '@mui/material';
import { Menu as MenuIcon, Work as WorkIcon, People as PeopleIcon, Assignment as AssignmentIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useStore } from '../../store';
import Logo from './Logo';
import NotificationBell from './NotificationBell';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
  { text: 'Assessments', icon: <AssignmentIcon />, path: '/assessments' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  // Global state for loading indicators and error notifications
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const clearError = useStore((state) => state.clearError);

  const navigate = useNavigate();
  
  // Placeholder for authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };
  const handleSignUp = () => navigate('/login');

  const drawerContent = (
    <div>
      <Toolbar sx={{ px: 2 }}>
        <Logo />
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', p: 1 }}>
        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.path} selected={isActive} sx={{ borderRadius: 2 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
        elevation={0}
        color="inherit"
        variant="outlined"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          
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
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
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

