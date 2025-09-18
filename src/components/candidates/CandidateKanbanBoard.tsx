import React from 'react';
import { Box, Paper, Typography, Chip, Avatar } from '@mui/material';
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Candidate, HiringStage } from '../../types';
import KanbanColumn from './KanbanColumn';
// FIX: Import the correct KanbanCard to be used in the DragOverlay
import KanbanCard from './KanbanCard'; 

interface CandidateKanbanBoardProps {
  candidates: Candidate[];
  onStageChange: (candidateId: string, newStage: HiringStage) => void;
}

const hiringStages: HiringStage[] = ['Applied', 'Screening', 'Technical', 'Managerial', 'HR', 'Offer', 'Hired', 'Rejected'];

const CandidateKanbanBoard: React.FC<CandidateKanbanBoardProps> = ({ candidates, onStageChange }) => {
  const [activeCandidate, setActiveCandidate] = React.useState<Candidate | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require pointer to move 8px before starting a drag
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const candidate = candidates.find(c => c.id === active.id);
    if (candidate) {
      setActiveCandidate(candidate);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCandidate(null);

    if (over && active.id !== over.id) {
      const candidateId = active.id as string;
      // The 'id' of the droppable column is the new stage
      const newStage = over.id as HiringStage;
      
      const candidate = candidates.find(c => c.id === candidateId);
      // Only trigger update if the stage is actually different
      if (candidate && candidate.currentStage !== newStage) {
        onStageChange(candidateId, newStage);
      }
    }
  };
  
  // Group candidates by their current hiring stage
  const columns = hiringStages.reduce((acc, stage) => {
    acc[stage] = candidates.filter(c => c.currentStage === stage);
    return acc;
  }, {} as Record<HiringStage, Candidate[]>);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', p: 1 }}>
        <SortableContext items={hiringStages} strategy={horizontalListSortingStrategy}>
          {hiringStages.map(stage => (
            <KanbanColumn
              key={stage}
              id={stage}
              title={stage}
              candidates={columns[stage]}
            />
          ))}
        </SortableContext>
      </Box>
      <DragOverlay>
        {/* FIX: Use the correct KanbanCard component here, which accepts the 'isOverlay' prop */}
        {activeCandidate ? <KanbanCard candidate={activeCandidate} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default CandidateKanbanBoard;

