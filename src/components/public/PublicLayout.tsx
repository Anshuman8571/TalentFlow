import React from 'react';
import { AppBar, Container, Toolbar, Box } from '@mui/material';
import Logo from '../common/Logo';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: 'transparent' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <Logo />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" component="main" sx={{ pb: 6 }}>
        {children}
      </Container>
    </Box>
  );
};

export default PublicLayout;
