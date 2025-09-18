import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface KeyMetricsSectionProps {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  newCandidates: number;
}

const KeyMetricsSection: React.FC<KeyMetricsSectionProps> = ({
  totalJobs,
  activeJobs,
  totalCandidates,
  newCandidates
}) => {
  return (
    <Box sx={{ mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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
          Key Metrics
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard
              title="Total Jobs"
              value={totalJobs}
              icon={<WorkIcon />}
              color="#4CAF50"
              delay={0.3}
              trend="up"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatCard
              title="Active Jobs"
              value={activeJobs}
              icon={<TrendingUpIcon />}
              color="#2196F3"
              delay={0.4}
              trend="up"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <StatCard
              title="Total Candidates"
              value={totalCandidates}
              icon={<PeopleIcon />}
              color="#FF9800"
              delay={0.5}
              trend="up"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StatCard
              title="New Candidates"
              value={newCandidates}
              icon={<PersonAddIcon />}
              color="#9C27B0"
              delay={0.6}
              trend="up"
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KeyMetricsSection;