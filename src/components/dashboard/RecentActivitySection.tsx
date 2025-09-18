import React from 'react';
import { 
  Box, 
  Card, 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const RecentActivitySection: React.FC = () => {
  const recentInterviews = [
    {
      candidate: 'Sarah Johnson',
      position: 'Frontend Developer',
      time: '2:00 PM',
      status: 'completed',
      icon: <PersonIcon />
    },
    {
      candidate: 'Mike Chen',
      position: 'Backend Developer',
      time: '3:30 PM',
      status: 'completed',
      icon: <PersonIcon />
    },
    {
      candidate: 'Emily Davis',
      position: 'UI/UX Designer',
      time: '4:00 PM',
      status: 'no-show',
      icon: <PersonIcon />
    },
    {
      candidate: 'Alex Rodriguez',
      position: 'DevOps Engineer',
      time: '5:00 PM',
      status: 'completed',
      icon: <PersonIcon />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'no-show':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />;
      case 'no-show':
        return <CancelIcon sx={{ fontSize: 16, color: '#F44336' }} />;
      default:
        return <AccessTimeIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />;
    }
  };

  return (
    <Box sx={{ mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.9 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}
        >
          Recent Activity
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1, color: '#2196F3' }} />
                Recent Interviews
              </Typography>
              <List>
                {recentInterviews.map((interview, index) => (
                  <ListItem key={index} sx={{ py: 1.5, borderRadius: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}>
                    <ListItemIcon>
                      {interview.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {interview.candidate}
                          </Typography>
                          {getStatusIcon(interview.status)}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <WorkIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {interview.position}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                            {interview.time}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={interview.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(interview.status),
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    45 min
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Avg. Interview Duration
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    87%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Interview Success Rate
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    5%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    No-show Rate
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecentActivitySection;