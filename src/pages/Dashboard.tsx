import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  LinearProgress,
  Skeleton,
  IconButton,
  Divider,
  Link as MuiLink,
  CardMedia,
  Stack,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingUp,
  Group as GroupIcon,
  Group,
  Work as WorkIcon,
  WorkOutline,
  Assessment as AssessmentIcon,
  Schedule as InterviewIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  CheckCircle as SuccessIcon,
  PeopleAltOutlined,
  People as PeopleIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Candidate, Job, HiringStage } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { TeamCollaborationIcon } from '../components/common/HiringIllustrations';
import {
  SmartMatchingIcon,
  InterviewManagementIcon,
  AnalyticsIcon as CustomAnalyticsIcon,
  FastHiringIcon,
  HeroPattern,
  MetricCardBg,
  TeamCollaborationEnhanced,
} from '../components/icons/DashboardIllustrations';
import {
  JobPostingIcon,
  CandidateReviewIcon,
  InterviewScheduleIcon,
  AnalyticsDashboardIcon,
  TalentPipelineIcon,
  AutomatedWorkflowIcon,
} from '../components/icons/HiringIllustrations';

// Hero Section with Figma-inspired design
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #1976d2 0%, #1976d2CC 100%)',
        borderRadius: 4,
        p: 0,
        mb: 4,
        overflow: 'hidden',
        color: 'white',
        border: '1px solid #1976d2',
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Welcome to TalentFlow
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                opacity: 0.9,
                maxWidth: '600px',
                fontWeight: 400,
              }}
            >
              Streamline your hiring process with AI-powered candidate matching, 
              automated workflows, and comprehensive analytics.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/jobs')}
                sx={{
                  bgcolor: 'white',
                  color: '#1976d2',
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Post New Job
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/assessments')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View Analytics
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Box>
      
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 200,
        }}
      >
        <TalentPipelineIcon sx={{ fontSize: 120, opacity: 0.8 }} />
      </Box>
      
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
        }}
      />
      
      <HeroPattern />
    </Box>
  );
};

// Enhanced Feature Card with custom illustrations
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  image?: string;
  color: string;
  navigationPath?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, image, color, navigationPath }) => {
  const navigate = useNavigate();
  const getCustomIcon = () => {
    switch (title) {
      case 'Smart Matching':
        return <SmartMatchingIcon sx={{ fontSize: 64, color: 'white' }} />;
      case 'Interview Management':
        return <InterviewManagementIcon sx={{ fontSize: 64, color: 'white' }} />;
      case 'Advanced Analytics':
        return <AnalyticsDashboardIcon sx={{ fontSize: 64, color: 'white' }} />;
      case 'Fast Hiring':
        return <AutomatedWorkflowIcon sx={{ fontSize: 64, color: 'white' }} />;
      default:
        return icon;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card
        sx={{
          p: 0,
          height: 320,
          borderRadius: 4,
          border: '2px solid',
          borderColor: color,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            boxShadow: `0 20px 40px ${color}30`,
            transform: 'translateY(-4px)',
            background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
          },
        }}
      >
        {/* Icon Section with Gradient Background */}
        <Box
          sx={{
            height: 140,
            background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
            }}
          />
          {getCustomIcon()}
        </Box>
        
        {/* Content Section */}
        <Box sx={{ p: 3, height: 180, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: 'text.primary',
              fontSize: '1.1rem'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              lineHeight: 1.6,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
          
          {/* Action Button */}
          <Box sx={{ mt: 2 }}>
            <Button
              size="small"
              onClick={() => navigationPath && navigate(navigationPath)}
              sx={{
                color: color,
                fontWeight: 600,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  background: 'transparent',
                  color: color,
                },
              }}
            >
              Learn More →
            </Button>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

// Enhanced StatCard with Figma-inspired design
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay: number;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <Card
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 4,
        border: '2px solid',
        borderColor: color,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
          boxShadow: `0 12px 24px ${color}30`,
          transform: 'translateY(-2px)',
          background: `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: color, opacity: 0.8 }}>
            {title}
          </Typography>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: color,
              boxShadow: `0 4px 12px ${color}40`,
            }}
          >
            {React.cloneElement(icon as React.ReactElement, { 
              sx: { fontSize: 24, color: 'white' } 
            })}
          </Box>
        </Box>
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 800, 
            color: 'text.primary',
            mb: 1,
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  </motion.div>
);

// Quick Action Card
const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  to: string;
}> = ({ title, description, icon, color, to }) => (
  <Card
    component={Link}
    to={to}
    sx={{
      p: 3,
      textDecoration: 'none',
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'grey.200',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
        borderColor: color,
      }
    }}
  >
    <Stack direction="row" spacing={3} alignItems="center">
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 32, color: color } })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
    </Stack>
  </Card>
);

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
    queryFn: () => api.candidates.getCandidates({ limit: 1000 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const allJobs = jobsResponse?.data || [];
  const allCandidates = candidatesResponse?.data || [];

  const activeJobsCount = allJobs.filter((j: Job) => j.status === 'active').length;
  const newCandidatesThisWeek = allCandidates.filter((c: Candidate) => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const candidatesInOffer = allCandidates.filter((c: Candidate) => c.currentStage === 'Offer').length;
  
  const isLoading = isLoadingJobs || isLoadingCandidates;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Enhanced Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <HeroSection />



        {/* Key Metrics Section */}
        <Container maxWidth="xl" sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Key Metrics
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Jobs"
                value={activeJobsCount}
                icon={<WorkIcon />}
                color="#1976d2"
                delay={0.3}
                trend="+12% this month"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="New Candidates"
                value={newCandidatesThisWeek}
                icon={<PeopleIcon />}
                color="#2e7d32"
                delay={0.4}
                trend="+8% this week"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Interviews Scheduled"
                value="24"
                icon={<EventIcon />}
                color="#ed6c02"
                delay={0.5}
                trend="+15% this week"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Success Rate"
                value="87%"
                icon={<TrendingUpIcon />}
                color="#9c27b0"
                delay={0.6}
                trend="+3% improvement"
              />
            </Grid>
          </Grid>
        </Container>

        {/* Quick Actions Section */}
        <Container maxWidth="xl" sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Quick Actions
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <QuickActionCard
                title="Post New Job"
                description="Create and publish a new job opening to attract top talent"
                icon={<AddIcon />}
                color="#1976d2"
                to="/jobs/new"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <QuickActionCard
                title="Review Applications"
                description="Browse and evaluate candidate applications for your open positions"
                icon={<ViewIcon />}
                color="#9c27b0"
                to="/candidates"
              />
            </Grid>
          </Grid>
        </Container>

        {/* Feature Showcase */}
        <Container maxWidth="xl" sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Platform Features
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={3}>
              <FeatureCard
                icon={<SmartMatchingIcon />}
                title="Smart Matching"
                description="AI-powered candidate matching based on skills, experience, and cultural fit using advanced algorithms and machine learning"
                delay={0.7}
                image="true"
                color="#1976d2"
                navigationPath="/candidates"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FeatureCard
                icon={<InterviewManagementIcon />}
                title="Interview Management"
                description="Streamlined scheduling and tracking of candidate interviews with automated notifications and video call integration"
                delay={0.8}
                image="true"
                color="#2e7d32"
                navigationPath="/interviews"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FeatureCard
                icon={<CustomAnalyticsIcon />}
                title="Advanced Analytics"
                description="Comprehensive insights into your hiring process and performance with detailed reports and data-driven recommendations"
                delay={0.9}
                image="true"
                color="#ed6c02"
                navigationPath="/assessments"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FeatureCard
                icon={<FastHiringIcon />}
                title="Fast Hiring"
                description="Accelerate your hiring process with automated workflows, bulk actions, and intelligent candidate screening"
                delay={1.0}
                image="true"
                color="#9c27b0"
                navigationPath="/jobs"
              />
            </Grid>
          </Grid>
        </Container>

        {/* Recent Activity & Analytics */}
        <Container maxWidth="xl" sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Recent Activity
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: '#1976d2',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #1976d215 0%, #1976d205 100%)',
                  }}
                >
                  {/* Header with illustration */}
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, #1976d2 0%, #1976d2CC 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Recent Interviews
                    </Typography>
                    <InterviewScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <List>
                      {[
                        { name: 'Aarav Sharma', position: 'Frontend Developer', time: '2 hours ago', status: 'Completed', avatar: 'AS' },
                        { name: 'Ananya Patel', position: 'Backend Engineer', time: '4 hours ago', status: 'In Progress', avatar: 'AP' },
                        { name: 'Vihaan Gupta', position: 'UX Designer', time: '1 day ago', status: 'Scheduled', avatar: 'VG' },
                        { name: 'Aisha Singh', position: 'Product Manager', time: '2 days ago', status: 'Completed', avatar: 'AS' },
                      ].map((interview, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 2 }}>
                          <ListItemAvatar>
                            <Avatar 
                              sx={{ 
                                bgcolor: interview.status === 'Completed' ? '#2e7d32' : 
                                         interview.status === 'In Progress' ? '#ed6c02' : '#1976d2',
                                fontWeight: 600,
                              }}
                            >
                              {interview.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {interview.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {interview.position} • {interview.time}
                              </Typography>
                            }
                          />
                          <Chip
                            label={interview.status}
                            size="small"
                            color={interview.status === 'Completed' ? 'success' : interview.status === 'In Progress' ? 'warning' : 'info'}
                            sx={{ fontWeight: 600 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: '#9c27b0',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #9c27b015 0%, #9c27b005 100%)',
                  }}
                >
                  {/* Header with illustration */}
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, #9c27b0 0%, #9c27b0CC 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Quick Stats
                    </Typography>
                    <AnalyticsDashboardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                  
                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #1976d215 0%, #1976d205 100%)',
                        border: '1px solid #1976d230',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                        Average Interview Duration
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        45 min
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #2e7d3215 0%, #2e7d3205 100%)',
                        border: '1px solid #2e7d3230',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                        Success Rate
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                        87%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #ed6c0215 0%, #ed6c0205 100%)',
                        border: '1px solid #ed6c0230',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                        No-show Rate
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                        3%
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Box>
  );
};

export default Dashboard;