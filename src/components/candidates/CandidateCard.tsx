import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Candidate, HiringStage } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
}

// A simple utility to get initials from a name
const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.length > 1 
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() 
    : name.substring(0, 2).toUpperCase();
};

// Color mapping for different hiring stages
const stageColors: Record<HiringStage, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Applied': 'default',
  'Screening': 'info',
  'Technical': 'primary',
  'Managerial': 'warning',
  'HR': 'secondary',
  'Offer': 'success',
  'Rejected': 'error',
  'Hired': 'success',
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const color = stageColors[candidate.currentStage];

  return (
    <Card
      component={Link}
      to={`/candidates/${candidate.id}`}
      sx={{ 
        height: '100%', 
        textDecoration: 'none', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        borderTop: 3,
        borderColor: `${color}.main`
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* Use a semi-transparent background for a more modern look */}
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark`, mr: 2, fontWeight: 600 }}>
            {getInitials(candidate.name)}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {candidate.email}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} /> 
        <Divider sx={{ my: 1.5 }} />
        <Chip 
          label={candidate.currentStage} 
          color={color}
          size="small"
          sx={{ alignSelf: 'flex-start' }}
        />
      </CardContent>
    </Card>
  );
};

export default CandidateCard;

