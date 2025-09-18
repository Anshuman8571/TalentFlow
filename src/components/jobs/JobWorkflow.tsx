import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Computer as ComputerIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { Job, Candidate } from '../../types';

interface JobWorkflowProps {
  job: Job;
  candidates: Candidate[];
  onCandidateAction?: (candidateId: string, action: string) => void;
}

const JobWorkflow: React.FC<JobWorkflowProps> = ({ job, candidates, onCandidateAction }) => {
  const jobCandidates = candidates.filter(c => c.appliedJobId === job.id);
  
  const stages = [
    {
      id: 'Applied',
      title: 'Applied',
      icon: <PersonIcon />,
      color: '#1976d2',
      candidates: jobCandidates.filter(c => c.currentStage === 'Applied'),
    },
    {
      id: 'Screening',
      title: 'Screening',
      icon: <PhoneIcon />,
      color: '#ed6c02',
      candidates: jobCandidates.filter(c => c.currentStage === 'Screening'),
    },
    {
      id: 'Technical',
      title: 'Technical',
      icon: <ComputerIcon />,
      color: '#9c27b0',
      candidates: jobCandidates.filter(c => c.currentStage === 'Technical'),
    },
    {
      id: 'Managerial',
      title: 'Managerial',
      icon: <BusinessIcon />,
      color: '#2e7d32',
      candidates: jobCandidates.filter(c => c.currentStage === 'Managerial'),
    },
    {
      id: 'HR',
      title: 'HR',
      icon: <BusinessIcon />,
      color: '#2e7d32',
      candidates: jobCandidates.filter(c => c.currentStage === 'HR'),
    },
    {
      id: 'Hired',
      title: 'Hired',
      icon: <CheckCircleIcon />,
      color: '#388e3c',
      candidates: jobCandidates.filter(c => c.currentStage === 'Hired'),
    },
    {
      id: 'Rejected',
      title: 'Rejected',
      icon: <CancelIcon />,
      color: '#d32f2f',
      candidates: jobCandidates.filter(c => c.currentStage === 'Rejected'),
    },
  ];

  const totalCandidates = jobCandidates.length;
  const conversionRate = totalCandidates > 0 ? (stages[4].candidates.length / totalCandidates) * 100 : 0;

  return (
    <Box>
      {/* Job Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
              {job.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {job.department} • {job.location}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
              {totalCandidates}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Applicants
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Conversion Rate
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {conversionRate.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={conversionRate}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: conversionRate > 20 ? '#2e7d32' : conversionRate > 10 ? '#ed6c02' : '#1976d2',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Workflow Stages */}
      <Grid container spacing={3}>
        {stages.map((stage) => (
          <Grid item xs={12} md={6} lg={4} key={stage.id}>
            <Card
              sx={{
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                minHeight: 400,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Stage Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${stage.color}15`,
                      color: stage.color,
                      mr: 2,
                    }}
                  >
                    {stage.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: stage.color }}>
                      {stage.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stage.candidates.length} candidates
                    </Typography>
                  </Box>
                </Box>

                {/* Candidates List */}
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  {stage.candidates.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 4,
                        color: 'text.secondary',
                      }}
                    >
                      <Typography variant="body2">
                        No candidates in this stage
                      </Typography>
                    </Box>
                  ) : (
                    stage.candidates.map((candidate) => (
                      <Box
                        key={candidate.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: '#f8f9fa',
                            borderColor: stage.color,
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              mr: 2,
                              backgroundColor: stage.color,
                              fontSize: '0.875rem',
                            }}
                          >
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {candidate.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {candidate.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Action Buttons */}
                        {stage.id !== 'hired' && stage.id !== 'rejected' && (
                          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => onCandidateAction?.(candidate.id, 'advance')}
                              sx={{
                                fontSize: '0.75rem',
                                borderColor: stage.color,
                                color: stage.color,
                                '&:hover': {
                                  backgroundColor: `${stage.color}15`,
                                  borderColor: stage.color,
                                },
                              }}
                            >
                              Advance
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => onCandidateAction?.(candidate.id, 'reject')}
                              sx={{ fontSize: '0.75rem' }}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobWorkflow;