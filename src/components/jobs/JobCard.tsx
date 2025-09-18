import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Button, Box, IconButton } from '@mui/material';
import { Job } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit as EditIcon, Archive as ArchiveIcon, Unarchive as UnarchiveIcon } from '@mui/icons-material';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onArchive: (job: Job) => void;
  onUnarchive: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onArchive, onUnarchive }) => {
  const navigate = useNavigate();
  
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
        mb: 2, 
        cursor: 'grab',
        '&:hover': { boxShadow: 3 },
        borderLeft: job.status === 'archived' ? '4px solid #9e9e9e' : '4px solid #4A90E2',
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {job.department} • {job.location}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {job.tags.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <Button size="small" onClick={handleViewDetails}>
            View Details
          </Button>
          <IconButton size="small" onClick={() => onEdit(job)} aria-label="edit job">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {job.status === 'active' ? (
          <IconButton size="small" onClick={() => onArchive(job)} aria-label="archive job">
            <ArchiveIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={() => onUnarchive(job)} aria-label="unarchive job">
            <UnarchiveIcon fontSize="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default JobCard;