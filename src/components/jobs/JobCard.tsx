import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Button, Box, IconButton } from '@mui/material';
import { Job, Candidate } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit as EditIcon, Archive as ArchiveIcon, Unarchive as UnarchiveIcon } from '@mui/icons-material';

interface JobCardProps {
  job: Job;
  candidates?: Candidate[];
  onEdit: (job: Job) => void;
  onArchive: (job: Job) => void;
  onUnarchive: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, candidates = [], onEdit, onArchive, onUnarchive }) => {
  const navigate = useNavigate();
  
  // Calculate job statistics from candidates
  const jobCandidates = candidates.filter(c => c.appliedJobId === job.id);
  const totalApplications = jobCandidates.length;
  const hiredCount = jobCandidates.filter(c => c.currentStage === 'Hired').length;
  const inProgressCount = jobCandidates.filter(c => 
    ['Screening', 'Technical', 'Managerial', 'HR'].includes(c.currentStage)
  ).length;
  
  // Set up sortable functionality
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id,
    data: { job },
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };
  
  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`);
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      sx={{ 
        mb: 3, 
        cursor: 'grab',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
        borderLeft: job.status === 'archived' ? '4px solid #9e9e9e' : '4px solid #1976d2',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              color: '#1976d2',
              fontSize: '1.1rem',
            }}
          >
            {job.title}
          </Typography>
          <Chip 
            label={job.status} 
            size="small" 
            color={job.status === 'active' ? 'success' : 'default'}
            sx={{ 
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          gutterBottom
          sx={{ 
            fontWeight: 500,
            mb: 2,
          }}
        >
          {job.department} • {job.location}
        </Typography>

        {/* Application Stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {totalApplications}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              applicants
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
              {hiredCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              hired
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#ed6c02' }}>
              {inProgressCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              in progress
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {job.tags.slice(0, 3).map((tag: string) => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                fontSize: '0.75rem',
                fontWeight: 500,
              }} 
            />
          ))}
          {job.tags.length > 3 && (
            <Chip 
              label={`+${job.tags.length - 3} more`} 
              size="small" 
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'text.secondary',
              }} 
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="small" 
            variant="contained"
            onClick={handleViewDetails}
            sx={{
              borderRadius: 2,
              px: 2,
              fontWeight: 600,
              fontSize: '0.8rem',
            }}
          >
            View Details
          </Button>
          <IconButton 
            size="small" 
            onClick={() => onEdit(job)} 
            aria-label="edit job"
            sx={{
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {job.status === 'active' ? (
          <IconButton 
            size="small" 
            onClick={() => onArchive(job)} 
            aria-label="archive job"
            sx={{
              color: '#f57c00',
              '&:hover': {
                backgroundColor: 'rgba(245, 124, 0, 0.1)',
              },
            }}
          >
            <ArchiveIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton 
            size="small" 
            onClick={() => onUnarchive(job)} 
            aria-label="unarchive job"
            sx={{
              color: '#388e3c',
              '&:hover': {
                backgroundColor: 'rgba(56, 142, 60, 0.1)',
              },
            }}
          >
            <UnarchiveIcon fontSize="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default JobCard;