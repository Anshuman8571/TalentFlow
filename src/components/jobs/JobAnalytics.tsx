import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { Job, Candidate } from '../../types';

interface JobAnalyticsProps {
  jobs: Job[];
  candidates: Candidate[];
}

const JobAnalytics: React.FC<JobAnalyticsProps> = ({ jobs, candidates }) => {
  // Calculate analytics
  const activeJobs = jobs.filter(job => job.status === 'active');
  const totalApplications = candidates.length;
  const hiredCandidates = candidates.filter(c => c.currentStage === 'Hired').length;
  const inProgressCandidates = candidates.filter(c => 
    ['Screening', 'Technical', 'Managerial', 'HR'].includes(c.currentStage)
  ).length;
  
  const hireRate = totalApplications > 0 ? (hiredCandidates / totalApplications) * 100 : 0;
  const conversionRate = totalApplications > 0 ? (inProgressCandidates / totalApplications) * 100 : 0;

  // Top performing jobs
  const jobsWithStats = jobs.map(job => {
    const jobCandidates = candidates.filter(c => c.appliedJobId === job.id);
    const hired = jobCandidates.filter(c => c.currentStage === 'Hired').length;
    const inProgress = jobCandidates.filter(c => 
      ['Screening', 'Technical', 'Managerial', 'HR'].includes(c.currentStage)
    ).length;
    
    return {
      ...job,
      applicants: jobCandidates.length,
      hired,
      inProgress,
      hireRate: jobCandidates.length > 0 ? (hired / jobCandidates.length) * 100 : 0,
    };
  }).sort((a, b) => b.applicants - a.applicants).slice(0, 5);

  const metrics = [
    {
      title: 'Active Jobs',
      value: activeJobs.length,
      icon: <WorkIcon />,
      color: '#1976d2',
      change: '+12%',
    },
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: <PeopleIcon />,
      color: '#2e7d32',
      change: '+8%',
    },
    {
      title: 'Hire Rate',
      value: `${hireRate.toFixed(1)}%`,
      icon: <TrendingUpIcon />,
      color: '#ed6c02',
      change: '+3.2%',
    },
    {
      title: 'In Progress',
      value: inProgressCandidates,
      icon: <ScheduleIcon />,
      color: '#9c27b0',
      change: '+15%',
    },
  ];

  return (
    <Box>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${metric.color}15`,
                      color: metric.color,
                      mr: 2,
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: metric.color }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={metric.change}
                  size="small"
                  sx={{
                    backgroundColor: '#e8f5e8',
                    color: '#2e7d32',
                    fontWeight: 600,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Top Performing Jobs */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}>
          Top Performing Jobs
        </Typography>
        <Grid container spacing={2}>
          {jobsWithStats.map((job, index) => (
            <Grid item xs={12} key={job.id}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.department} • {job.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {job.applicants}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Applications
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                        {job.hired}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hired
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#ed6c02' }}>
                        {job.hireRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hire Rate
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={job.hireRate}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: job.hireRate > 20 ? '#2e7d32' : job.hireRate > 10 ? '#ed6c02' : '#1976d2',
                    },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default JobAnalytics;