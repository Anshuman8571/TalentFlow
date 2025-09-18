import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay: number;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  delay, 
  trend 
}) => (
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

export default StatCard;