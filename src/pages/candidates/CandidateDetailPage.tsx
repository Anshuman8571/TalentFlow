import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Email as EmailIcon, Phone as PhoneIcon, Work as WorkIcon } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineItemClasses, TimelineDotProps } from '@mui/lab';
import { useCandidates } from '../../hooks/useCandidates';
import { Job, HiringStage, StatusChange, Note, Candidate } from '../../types';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import AssessmentResults from '../../components/candidates/AssessmentsResult';

const getInitials = (name: string) => {
  if (!name) return '';
  const names = name.split(' ');
  return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};

const stageColors: Record<HiringStage, 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'> = {
  'Applied': 'default', 'Screening': 'info', 'Technical': 'primary', 'Managerial': 'warning', 'HR': 'secondary', 'Offer': 'success', 'Rejected': 'error', 'Hired': 'success'
};

// Sub-component for the main candidate information header
const CandidateHeader: React.FC<{ candidate: Candidate; jobTitle?: string }> = ({ candidate, jobTitle }) => (
  <Paper sx={{ p: 4, mb: 3 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem', mb: 2, bgcolor: 'primary.main' }}>
            {getInitials(candidate.name)}
          </Avatar>
          <Typography variant="h5">{candidate.name}</Typography>
          <Chip label={candidate.currentStage} color={stageColors[candidate.currentStage]} size="small" sx={{ mt: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>Contact Information</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><EmailIcon sx={{ mr: 1, color: 'text.secondary' }} /> {candidate.email}</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} /> {candidate.phone}</Box>
        <Typography variant="h6" gutterBottom>Applied For</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
          {jobTitle ? jobTitle : <Typography color="text.secondary">Job information not available.</Typography>}
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState('');
  const [newStage, setNewStage] = useState<HiringStage | ''>('');

  const {
    candidate,
    isLoadingCandidate,
    candidateError,
    addNote,
    isAddingNote,
    updateStage,
    isUpdatingCandidateStage,
  } = useCandidates(id);

  const { data: appliedJob } = useQuery<Job>({
    queryKey: ['job', candidate?.appliedJobId],
    queryFn: () => api.jobs.getJob(candidate!.appliedJobId),
    enabled: !!candidate?.appliedJobId,
  });

  const handleAddNote = () => {
    if (newNote.trim() && id) {
      addNote({
        candidateId: id,
        note: { content: newNote.trim(), createdBy: 'Admin User', mentions: [] }
      }, {
        onSuccess: () => setNewNote('')
      });
    }
  };

  const handleUpdateStage = () => {
    if (newStage && id) {
      updateStage({
        candidateId: id,
        stage: newStage
      }, {
        onSuccess: () => setNewStage('')
      });
    }
  };

  if (isLoadingCandidate) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;
  
  if (candidateError) return <Alert severity="error">Failed to load candidate details: {candidateError.message}</Alert>;
  if (!candidate) return <Alert severity="warning">Candidate not found.</Alert>;
  
  const statusHistory = (candidate.statusHistory as StatusChange[] || []);
  const notes = (candidate.notes as Note[] || []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/candidates')} sx={{ mb: 2 }}>
        Back to Pipeline
      </Button>

      <CandidateHeader candidate={candidate} jobTitle={appliedJob?.title} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
           <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Hiring Progress</Typography>
            <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, }, }}>
              {statusHistory.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((change, index) => {
                const chipColor = stageColors[change.toStage];
                // FIX: Create a new variable with a type that is guaranteed to be valid for TimelineDot.
                const dotColor: TimelineDotProps['color'] = chipColor === 'default' ? 'grey' : chipColor;
                
                return (
                  <TimelineItem key={change.id}>
                    <TimelineSeparator>
                      <TimelineDot color={dotColor} />
                      {index < statusHistory.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle1">{change.toStage}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(change.timestamp), 'PPP p')}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </Paper>
           <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Completed Assessments</Typography>
                <AssessmentResults candidateId={candidate.id} />
            </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Update Stage</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>New Stage</InputLabel>
              <Select value={newStage} label="New Stage" onChange={(e) => setNewStage(e.target.value as HiringStage)}>
                {Object.keys(stageColors).map(stage => (
                  <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleUpdateStage} disabled={!newStage || isUpdatingCandidateStage}>
              {isUpdatingCandidateStage ? 'Updating...' : 'Update'}
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Notes</Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button sx={{ mt: 1 }} variant="contained" onClick={handleAddNote} disabled={isAddingNote}>
                {isAddingNote ? 'Adding...' : 'Add Note'}
              </Button>
            </Box>
            <Divider />
            <Box sx={{ mt: 2, maxHeight: '300px', overflowY: 'auto' }}>
              {notes.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(note => (
                <Paper key={note.id} variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <Typography variant="body2">{note.content}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {note.createdBy} on {format(new Date(note.createdAt), 'PP')}
                  </Typography>
                </Paper>
              ))}
              {notes.length === 0 && <Typography variant="body2" color="text.secondary">No notes yet.</Typography>}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CandidateDetailPage;

