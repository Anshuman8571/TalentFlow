import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import JobsBoard from '../../components/jobs/JobsBoard';

const JobsPage: React.FC = () => {
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
              }}
            >
              Create, manage, and track all your job postings in one place. 
              Drag and drop to reorder, filter by status, and keep your hiring pipeline organized.
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      <JobsBoard />
    </Container>
  );
};

export default JobsPage;