import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
// 1. Import your logo image from the assets folder
import logoImage from '../../assests/logo.png';

const Logo: React.FC = () => {
  return (
    <Box
      component={Link}
      to="/dashboard"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        height: '40px', // Set a fixed height for consistency
      }}
    >
      {/* 2. Use an img tag to display the imported logo */}
      <img
        src={logoImage}
        alt="TalentFlow Logo"
        style={{
          height: '100%',
          width: 'auto', // Maintain aspect ratio
        }}
      />
    </Box>
  );
};

export default Logo;

