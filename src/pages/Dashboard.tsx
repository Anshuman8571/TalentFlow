import React, { useMemo } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Link as MuiLink, Divider, Skeleton, SvgIcon, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { WorkOutline, PeopleAltOutlined, AssignmentOutlined, AddCircleOutline } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Job, Candidate, HiringStage } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

// A decorative background SVG for the hero section
const BackgroundShape = () => (
  <SvgIcon component="svg" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.03, color: 'primary.main' }}>
    <path fill="currentColor" d="M1200,0L0,0l0,500l1440,0l0-500C1320,250,1320,120,1200,0z" />
  </SvgIcon>
);

// A redesigned, more interactive KPI card
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactElement; isLoading: boolean; path: string; }> = ({ title, value, icon, isLoading, path }) => (
  <Paper
    component={Link}
    to={path}
    variant="outlined"
    sx={{
      p: 3,
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      textDecoration: 'none',
      color: 'text.primary',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      }
    }}
  >
    {isLoading ? <Skeleton variant="circular" width={48} height={48} /> : 
      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>{icon}</Avatar>
    }
    <Box sx={{ ml: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {isLoading ? <Skeleton width={60} /> : value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Paper>
);

// A simple component for the hiring funnel bar chart
const HiringFunnel: React.FC<{ candidates: Candidate[]; isLoading: boolean; }> = ({ candidates, isLoading }) => {
  const stages: HiringStage[] = ['Applied', 'Screening', 'Technical', 'Managerial', 'Offer', 'Hired'];
  
  const funnelData = useMemo(() => {
    const counts = stages.map(stage => ({
      stage,
      count: candidates.filter(c => c.currentStage === stage).length,
    }));
    const maxCount = Math.max(...counts.map(s => s.count), 1); // Avoid division by zero
    return counts.map(s => ({ ...s, percentage: (s.count / maxCount) * 100 }));
  }, [candidates]);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={240} />;
  }

  return (
    <Box>
      {funnelData.map(({ stage, count, percentage }) => (
        <Box key={stage} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="body2" sx={{ width: '100px', flexShrink: 0 }}>{stage}</Typography>
          <Box sx={{ flexGrow: 1, height: '28px', backgroundColor: 'action.hover', borderRadius: 1, mr: 2, position: 'relative' }}>
            <Box sx={{ width: `${percentage}%`, height: '100%', backgroundColor: 'primary.main', borderRadius: 1, transition: 'width 0.5s ease-in-out' }} />
             <Typography variant="body2" sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: percentage > 30 ? 'white' : 'text.primary' }}>
              {count}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Define the expected shapes of the API responses for strong typing.
interface JobsApiResponse {
  data: Job[];
}

interface CandidatesApiResponse {
  data: Candidate[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Fetch all necessary data for the dashboard widgets
  const { data: jobsResponse, isLoading: isLoadingJobs } = useQuery<JobsApiResponse>({
    queryKey: ['jobs'],
    queryFn: () => api.jobs.getJobs({ limit: 1000 }),
  });
  
  const { data: candidatesResponse, isLoading: isLoadingCandidates } = useQuery<CandidatesApiResponse>({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates({ limit: 1000 }), // Fetch all for accurate stats
  });

  const allJobs = jobsResponse?.data || [];
  const allCandidates = candidatesResponse?.data || [];

  const activeJobsCount = allJobs.filter((j: Job) => j.status === 'active').length;
  const newCandidatesThisWeek = allCandidates.filter((c: Candidate) => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const candidatesInOffer = allCandidates.filter((c: Candidate) => c.currentStage === 'Offer').length;
  
  const recentActivities = useMemo(() => {
      const jobActivities = allJobs.map((j: Job) => ({ type: 'job' as const, data: j, date: new Date(j.updatedAt) }));
      const candidateActivities = allCandidates.map((c: Candidate) => ({ type: 'candidate' as const, data: c, date: new Date(c.createdAt) }));
      return [...jobActivities, ...candidateActivities].sort((a,b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [allJobs, allCandidates]);

  const isLoading = isLoadingJobs || isLoadingCandidates;

  return (
    <Box>
       <Box sx={{ py: 6, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <BackgroundShape />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            TalentFlow Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your hiring command center.
          </Typography>
        </motion.div>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Active Jobs" value={activeJobsCount} icon={<WorkOutline />} isLoading={isLoading} path="/jobs" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="New Candidates (7d)" value={newCandidatesThisWeek} icon={<PeopleAltOutlined />} isLoading={isLoading} path="/candidates" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="In Offer Stage" value={candidatesInOffer} icon={<AssignmentOutlined />} isLoading={isLoading} path="/candidates" /></Grid>
          <Grid item xs={12} sm={6} md={3}>
             <Button component={Link} to="/jobs" variant="outlined" sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: 1}}>
                <AddCircleOutline />
                Create New Job
             </Button>
          </Grid>
        </Grid>
      
        {/* Main Content Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Hiring Funnel</Typography>
              <HiringFunnel candidates={allCandidates} isLoading={isLoading} />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
             <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                {isLoading ? <Skeleton height={240} /> : (
                    <List disablePadding>
                        {recentActivities.map(activity => {
                            // FIX: Check the activity type and render the correct property (title for job, name for candidate).
                            const isJob = activity.type === 'job';
                            const data = activity.data as Job | Candidate; // Help TypeScript understand the data shape
                            return (
                                <ListItem key={data.id} disableGutters>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {isJob ? <WorkOutline /> : <PeopleAltOutlined />}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primaryTypographyProps={{fontWeight: 500}}
                                        primary={
                                            <MuiLink component={Link} to={`/${isJob ? 'jobs' : 'candidates'}/${data.id}`}>
                                                {isJob ? (data as Job).title : (data as Candidate).name}
                                            </MuiLink>
                                        }
                                        secondary={
                                            isJob 
                                            ? `Job updated ${formatDistanceToNow(activity.date, { addSuffix: true })}`
                                            : `New candidate applied ${formatDistanceToNow(activity.date, { addSuffix: true })}`
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

