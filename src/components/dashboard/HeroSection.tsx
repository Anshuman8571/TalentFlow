import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TalentPipelineIcon } from '../icons/CustomIcons';

// Hero Pattern Component
const HeroPattern: React.FC = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      zIndex: 0,
      background: `
        radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)
      `,
    }}
  />
);

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        borderRadius: 6,
        p: { xs: 4, md: 6 },
        mb: 8,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2 }}>
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Welcome to TalentFlow
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                opacity: 0.9,
                maxWidth: '600px',
                fontWeight: 400,
              }}
            >
              Streamline your hiring process with AI-powered candidate matching, 
              automated workflows, and comprehensive analytics.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/jobs')}
                sx={{
                  bgcolor: 'white',
                  color: '#1976d2',
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Post New Job
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/assessments')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View Analytics
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Box>
      
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 200,
        }}
      >
        <TalentPipelineIcon sx={{ fontSize: 120, opacity: 0.8 }} />
      </Box>
      
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
        }}
      />
      
      <HeroPattern />
    </Box>
  );
};

export default HeroSection;