import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { Job } from '../../types';
import JobModal from './JobModal';
import JobWorkflow from './JobWorkflow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '../../store';

const JobDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setError = useStore((state) => state.setError);
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Fetch job details
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => api.jobs.getJob(jobId as string),
    enabled: !!jobId,
  });

  // Fetch candidates for workflow view
  const { data: candidatesResponse } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates(),
  });

  const candidates = candidatesResponse?.data || [];
  
  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: (job: Partial<Job>) => api.jobs.updateJob(jobId as string, job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update job');
    },
  });
  
  const handleEditJob = () => {
    setIsModalOpen(true);
  };
  
  const handleSubmitJob = (data: Partial<Job>) => {
    if (job) {
      updateJobMutation.mutate({
        id: job.id,
        ...data,
      });
    }
  };
  
  const handleBack = () => {
    navigate('/jobs');
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCandidateAction = (candidateId: string, action: string) => {
    // TODO: Implement candidate action handling
    console.log(`Action ${action} for candidate ${candidateId}`);
  };
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !job) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error instanceof Error ? error.message : 'Failed to load job details'}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back to Jobs
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Job Details
        </Typography>
      </Box>
      
      {/* Navigation Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
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
          <Tab label="Overview" />
          <Tab label="Hiring Pipeline" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {job.department} • {job.location}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={job.status === 'active' ? 'Active' : 'Archived'} 
                  color={job.status === 'active' ? 'success' : 'default'}
                  size="small"
                  sx={{ mr: 1 }}
                />
                {job.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
                ))}
              </Box>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditJob}
            >
              Edit
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Updated: {new Date(job.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      )}

      {activeTab === 1 && (
        <JobWorkflow 
          job={job} 
          candidates={candidates} 
          onCandidateAction={handleCandidateAction}
        />
      )}
      
      <JobModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitJob}
        job={job}
        isLoading={updateJobMutation.isPending}
      />
    </Box>
  );
};

export default JobDetail;