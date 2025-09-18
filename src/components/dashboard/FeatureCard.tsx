import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  SmartMatchingIcon, 
  InterviewManagementIcon, 
  AnalyticsDashboardIcon, 
  AutomatedWorkflowIcon 
} from '../icons/CustomIcons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  image?: string;
  color: string;
  navigationPath?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay, 
  image, 
  color, 
  navigationPath 
}) => {
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

export default FeatureCard;