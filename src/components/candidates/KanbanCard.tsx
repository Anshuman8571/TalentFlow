import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Candidate } from '../../types';
import { Link } from 'react-router-dom';

interface KanbanCardProps {
  candidate: Candidate;
  isOverlay?: boolean;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};

const KanbanCard: React.FC<KanbanCardProps> = ({ candidate, isOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: candidate.id,
    data: { candidate },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isOverlay ? '0 15px 30px rgba(0,0,0,0.2)' : undefined,
    cursor: isOverlay ? 'grabbing' : 'grab',
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      component={Link}
      to={`/candidates/${candidate.id}`}
      sx={{ mb: 1, textDecoration: 'none' }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1, fontSize: '0.8rem' }}>
            {getInitials(candidate.name)}
          </Avatar>
          <Typography variant="body1">{candidate.name}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {candidate.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KanbanCard;
