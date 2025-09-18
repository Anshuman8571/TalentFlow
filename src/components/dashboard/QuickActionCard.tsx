import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  to: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  to 
}) => (
  <Card
    component={Link}
    to={to}
    sx={{
      p: 3,
      textDecoration: 'none',
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'grey.200',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
        borderColor: color,
      }
    }}
  >
    <Stack direction="row" spacing={3} alignItems="center">
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 32, color: color } })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
    </Stack>
  </Card>
);

export default QuickActionCard;