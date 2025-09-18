import React from 'react';
import { Box, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/dashboard/HeroSection';
import KeyMetricsSection from '../components/dashboard/KeyMetricsSection';
import QuickActionsSection from '../components/dashboard/QuickActionsSection';
import FeatureShowcaseSection from '../components/dashboard/FeatureShowcaseSection';
import RecentActivitySection from '../components/dashboard/RecentActivitySection';
import JobManagementSection from '../components/dashboard/JobManagementSection';
import { api } from '../services/api';
import { Candidate, Job } from '../types';



// Define the expected shapes of the API responses for strong typing.
interface JobsApiResponse {
  data: Job[];
}

interface CandidatesApiResponse {
  data: Candidate[];
}

const Dashboard: React.FC = () => {
  // Fetch all necessary data for the dashboard widgets
  const { data: jobsResponse } = useQuery<JobsApiResponse>({
    queryKey: ['jobs'],
    queryFn: () => api.jobs.getJobs(),
  });

  const { data: candidatesResponse } = useQuery<CandidatesApiResponse>({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates(),
  });

  const jobs = jobsResponse?.data || [];
  const candidates = candidatesResponse?.data || [];

  // Calculate metrics
  const activeJobsCount = jobs.filter(job => job.status === 'active').length;
  const newCandidatesThisWeek = candidates.filter(candidate => {
    const createdAt = new Date(candidate.createdAt);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return createdAt >= oneWeekAgo;
  }).length;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <HeroSection />
        
        <KeyMetricsSection 
          totalJobs={jobs.length}
          activeJobs={activeJobsCount}
          totalCandidates={candidates.length}
          newCandidates={newCandidatesThisWeek}
        />
        
        <JobManagementSection />
        
        <QuickActionsSection />
        
        <RecentActivitySection />
        
        <FeatureShowcaseSection />
      </Container>
    </Box>
  );
};

export default Dashboard;