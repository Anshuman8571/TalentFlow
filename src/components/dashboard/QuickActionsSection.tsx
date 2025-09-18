import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import QuickActionCard from './QuickActionCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';

const QuickActionsSection: React.FC = () => {
  const quickActions = [
    {
      title: 'Post New Job',
      description: 'Create and publish a new job opening',
      icon: <AddIcon />,
      color: '#4CAF50',
      to: '/jobs/new'
    },
    {
      title: 'Browse Candidates',
      description: 'Search and filter through candidate profiles',
      icon: <SearchIcon />,
      color: '#2196F3',
      to: '/candidates'
    },
    {
      title: 'Schedule Interview',
      description: 'Set up interviews with selected candidates',
      icon: <CalendarTodayIcon />,
      color: '#FF9800',
      to: '/interviews/schedule'
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics and insights',
      icon: <AssessmentIcon />,
      color: '#9C27B0',
      to: '/reports'
    }
  ];

  return (
    <Box sx={{ mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}
        >
          Quick Actions
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} md={6} key={action.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <QuickActionCard {...action} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActionsSection;