import React from 'react';
// The <Router> component has been removed from this file's imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import  { theme }  from './theme';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import CandidatesPage from './pages/candidates/CandidatesPage';
import CandidateDetailPage from './pages/candidates/CandidateDetailPage';
import AssessmentsPage from './pages/assessments/AssessmentsPage';
import AssessmentBuilderPage from './pages/assessments/AssessmentBuilderPage';
import LoginPage from './pages/auth/LoginPage';

const queryClient = new QueryClient();

// This component will wrap all the routes that should have the main layout
const AppLayout = () => (
  <Layout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/candidates/:id" element={<CandidateDetailPage />} />
      <Route path="/assessments" element={<AssessmentsPage />} />
      <Route path="/assessments/builder" element={<AssessmentBuilderPage />} />
      <Route path="/assessments/builder/:id" element={<AssessmentBuilderPage />} />
      {/* Any other private routes would go here */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Layout>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* The <Router> component was here and has been removed */}
        <Routes>
          {/* Add a public route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* All other routes will now be rendered through the AppLayout component */}
          <Route path="/*" element={<AppLayout />} />
          
          {/* The root path now redirects to the login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

