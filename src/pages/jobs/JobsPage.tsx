import React from 'react';
import { Container } from '@mui/material';
import JobsBoard from '../../components/jobs/JobsBoard';

const JobsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <JobsBoard />
    </Container>
  );
};

export default JobsPage;