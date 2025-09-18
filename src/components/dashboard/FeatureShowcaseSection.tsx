import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

const FeatureShowcaseSection: React.FC = () => {
  const features = [
    {
      title: 'Job Management',
      description: 'Create, edit, and manage job postings with ease. Track applications and manage the entire hiring pipeline.',
      icon: <WorkIcon />,
      color: '#4CAF50',
      to: '/jobs'
    },
    {
      title: 'Candidate Tracking',
      description: 'Comprehensive candidate database with advanced search and filtering capabilities.',
      icon: <PeopleIcon />,
      color: '#2196F3',
      to: '/candidates'
    },
    {
      title: 'Interview Scheduling',
      description: 'Seamlessly schedule and manage interviews with integrated calendar functionality.',
      icon: <CalendarTodayIcon />,
      color: '#FF9800',
      to: '/interviews'
    },
    {
      title: 'Analytics & Reports',
      description: 'Gain insights with detailed analytics and customizable reports on your hiring process.',
      icon: <BarChartIcon />,
      color: '#9C27B0',
      to: '/reports'
    },
    {
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent notifications about important hiring activities.',
      icon: <NotificationsIcon />,
      color: '#F44336',
      to: '/notifications'
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with GDPR compliance and data protection features.',
      icon: <SecurityIcon />,
      color: '#607D8B',
      to: '/security'
    }
  ];

  return (
    <Box sx={{ mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
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
          Feature Showcase
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={feature.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
            >
              <FeatureCard {...feature} delay={1.3 + index * 0.1} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureShowcaseSection;