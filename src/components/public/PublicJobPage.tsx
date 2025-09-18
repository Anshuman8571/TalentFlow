import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { Job, Candidate } from '../../types';
import { Container, Typography, Box, Paper, Chip, Divider, Button, CircularProgress, Alert } from '@mui/material';
import { format } from 'date-fns';
import { useStore } from '../../store';
// We will create this ApplyModal component in the next step
// import ApplyModal from '../../components/public/ApplyModal'; 

const PublicJobPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const addNotification = useStore((state) => state.addNotification);

  const { data: job, isLoading, isError } = useQuery<Job>({
    queryKey: ['publicJob', slug],
    queryFn: () => api.jobs.getJobBySlug(slug!),
    enabled: !!slug,
  });

  const submitApplicationMutation = useMutation({
    mutationFn: (applicationData: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory' | 'notes'>) => 
      api.candidates.createCandidate(applicationData),
    onSuccess: (newCandidate) => {
      setIsApplyModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      addNotification(`New application from ${newCandidate.name} for ${job?.title}`, `/candidates/${newCandidate.id}`);
      // In a real app, you'd show a success toast. alert is a placeholder.
      alert('Application submitted successfully!'); 
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;
  if (isError || !job) {
    return (
        <Paper sx={{p: 4, textAlign: 'center'}}>
            <Typography variant="h5" gutterBottom>Job Not Found</Typography>
            <Typography color="text.secondary">This job opening may have been filled or the link is incorrect.</Typography>
        </Paper>
    );
  }

  return (
    <>
      <Paper sx={{ p: { xs: 2, md: 5 } }}>
        <Typography variant="h3" component="h1" gutterBottom>{job.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {job.department} • {job.location}
        </Typography>
        <Box sx={{ my: 2 }}>
          {job.tags.map(tag => <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />)}
        </Box>
        <Divider sx={{ my: 3 }} />
        {/* Render description safely to allow for line breaks */}
        <Box sx={{typography: 'body1', lineHeight: 1.7}} dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
        <Divider sx={{ my: 3 }} />
        <Button 
          variant="contained" 
          size="large"
          onClick={() => setIsApplyModalOpen(true)}
        >
          Apply for this position
        </Button>
      </Paper>
      {/* We will uncomment and build this modal in the next step */}
      {/* <ApplyModal 
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={job.id}
        onSubmit={submitApplicationMutation.mutate}
        isLoading={submitApplicationMutation.isPending}
      /> */}
    </>
  );
};
export default PublicJobPage;
