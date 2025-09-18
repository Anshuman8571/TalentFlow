import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { Candidate, HiringStage } from '../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  id: HiringStage;
  title: string;
  candidates: Candidate[];
}

const stageColors: Record<HiringStage, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Applied': 'default', 'Screening': 'info', 'Technical': 'primary', 'Managerial': 'warning', 'HR': 'secondary', 'Offer': 'success', 'Rejected': 'error', 'Hired': 'success'
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, candidates }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        width: 300,
        minWidth: 300,
        height: 'calc(100vh - 220px)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isOver ? 'action.hover' : 'grey.50',
        transition: 'background-color 0.2s ease-in-out',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">{title}</Typography>
        <Chip label={candidates.length} color={stageColors[id]} size="small" />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
        <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {candidates.map(candidate => (
            <KanbanCard key={candidate.id} candidate={candidate} />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default KanbanColumn;
