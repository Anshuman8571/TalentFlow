import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import JobsBoard from '../../components/jobs/JobsBoard';
import JobAnalytics from '../../components/jobs/JobAnalytics';
import { api } from '../../services/api';

const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: jobsResponse } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.jobs.getJobs(),
  });

  const { data: candidatesResponse } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates(),
  });

  const jobs = jobsResponse?.data || [];
  const candidates = candidatesResponse?.data || [];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: 3,
            p: 4,
            mb: 4,
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#1976d2',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Jobs Management
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                mb: 3,
              }}
            >
              Create, manage, and track all your job postings in one place. 
              Drag and drop to reorder, filter by status, and keep your hiring pipeline organized.
            </Typography>
            
            {/* Navigation Tabs */}
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1976d2',
                  height: 3,
                  borderRadius: 1.5,
                },
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  minWidth: 120,
                },
              }}
            >
              <Tab label="Job Board" />
              <Tab label="Analytics" />
            </Tabs>
          </Box>
        </Paper>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 0 && <JobsBoard />}
        {activeTab === 1 && <JobAnalytics jobs={jobs} candidates={candidates} />}
      </motion.div>
    </Container>
  );
};

export default JobsPage;