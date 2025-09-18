import React from 'react';
import { Container } from '@mui/material';
import JobDetail from '../../components/jobs/JobDetail';

const JobDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <JobDetail />
    </Container>
  );
};

export default JobDetailPage;