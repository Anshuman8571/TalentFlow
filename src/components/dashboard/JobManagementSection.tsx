import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Work as WorkIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { api } from '../../services/api';
import { Job, Candidate } from '../../types';

const JobManagementSection: React.FC = () => {
  const navigate = useNavigate();

  // Fetch jobs and candidates data
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

  // Get active jobs and their statistics
  const activeJobs = jobs.filter((job: Job) => job.status === 'active').slice(0, 5);
  
  const getJobStats = (jobId: string) => {
    const jobCandidates = candidates.filter((candidate: Candidate) => candidate.appliedJobId === jobId);
    const totalApplications = jobCandidates.length;
    const inProgress = jobCandidates.filter((c: Candidate) => 
      ['Screening', 'Technical', 'Managerial', 'HR'].includes(c.currentStage)
    ).length;
    const hired = jobCandidates.filter((c: Candidate) => c.currentStage === 'Hired').length;
    
    return { totalApplications, inProgress, hired };
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleCreateJob = () => {
    navigate('/jobs');
  };

  const handleViewAllJobs = () => {
    navigate('/jobs');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e0e0e0',
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon sx={{ color: '#1976d2', mr: 1, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
                Job Management
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewAllJobs}
                sx={{ borderRadius: 2 }}
              >
                View All
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateJob}
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                  },
                }}
              >
                New Job
              </Button>
            </Box>
          </Box>

          {activeJobs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <WorkIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Active Jobs
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first job posting to start hiring
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateJob}
                sx={{ borderRadius: 2 }}
              >
                Create First Job
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Job Statistics Overview */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    border: '1px solid #90caf9',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1565c0' }}>
                      Quick Stats
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TrendingUpIcon sx={{ fontSize: 20, color: '#1976d2', mr: 1 }} />
                      <Typography variant="body2">
                        <strong>{activeJobs.length}</strong> Active Jobs
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ fontSize: 20, color: '#1976d2', mr: 1 }} />
                      <Typography variant="body2">
                        <strong>{candidates.length}</strong> Total Applications
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon sx={{ fontSize: 20, color: '#1976d2', mr: 1 }} />
                      <Typography variant="body2">
                        <strong>
                          {candidates.filter((c: Candidate) => 
                            ['Screening', 'Technical', 'Managerial', 'HR'].includes(c.currentStage)
                          ).length}
                        </strong> In Progress
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Jobs List */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Recent Active Jobs
                </Typography>
                <List sx={{ p: 0 }}>
                  {activeJobs.map((job: Job, index: number) => {
                    const stats = getJobStats(job.id);
                    const progressPercentage = stats.totalApplications > 0 
                      ? (stats.hired / stats.totalApplications) * 100 
                      : 0;

                    return (
                      <React.Fragment key={job.id}>
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: 'rgba(25, 118, 210, 0.02)',
                            border: '1px solid rgba(25, 118, 210, 0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(25, 118, 210, 0.05)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          <ListItemIcon>
                            <WorkIcon sx={{ color: '#1976d2' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {job.title}
                                </Typography>
                                <Chip
                                  label={job.department}
                                  size="small"
                                  sx={{
                                    bgcolor: '#e3f2fd',
                                    color: '#1565c0',
                                    fontWeight: 500,
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {job.location} • {stats.totalApplications} applications
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    Hiring Progress:
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={progressPercentage}
                                    sx={{
                                      flexGrow: 1,
                                      height: 6,
                                      borderRadius: 3,
                                      bgcolor: '#e0e0e0',
                                      '& .MuiLinearProgress-bar': {
                                        borderRadius: 3,
                                        bgcolor: progressPercentage > 50 ? '#4caf50' : '#ff9800',
                                      },
                                    }}
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    {stats.hired} hired
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleViewJob(job.id)}
                              sx={{
                                color: '#1976d2',
                                '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' },
                              }}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </ListItem>
                        {index < activeJobs.length - 1 && <Divider sx={{ my: 0.5 }} />}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobManagementSection;