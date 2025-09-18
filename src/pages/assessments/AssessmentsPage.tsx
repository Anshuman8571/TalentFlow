import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Button,
  Paper,
  Avatar,
  IconButton
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Assignment as AssignmentIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Assessment } from '../../types';
import { motion } from 'framer-motion';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { useStore } from '../../store';

interface AssessmentsApiResponse {
  data: Assessment[];
}

const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setError = useStore((state) => state.setError);
  const [searchTerm, setSearchTerm] = useState('');
  // State to manage which assessment is about to be deleted
  const [assessmentToDelete, setAssessmentToDelete] = useState<Assessment | null>(null);

  const { data: response, isLoading, isError } = useQuery<AssessmentsApiResponse>({
    queryKey: ['assessments'],
    queryFn: () => api.assessments.getAssessments(),
  });

  // Mutation for deleting an assessment
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.assessments.deleteAssessment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      setAssessmentToDelete(null); // Close the dialog on success
    },
    onError: (err) => {
        setError(err instanceof Error ? err.message : 'Failed to delete assessment');
        setAssessmentToDelete(null); // Close the dialog on error
    }
  });

  const assessments = response?.data || [];
  const filteredAssessments = assessments.filter(assessment => 
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (assessment.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers for the delete process
  const handleDeleteClick = (assessment: Assessment) => {
    setAssessmentToDelete(assessment);
  };

  const handleConfirmDelete = () => {
    if (assessmentToDelete) {
      deleteMutation.mutate(assessmentToDelete.id);
    }
  };
  
  const renderContent = () => {
    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;
    if (isError) return <Alert severity="error">Failed to load assessments.</Alert>;
    if (filteredAssessments.length === 0) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">No assessments found</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
          {filteredAssessments.map((assessment, index) => {
            const totalQuestions = assessment.sections.reduce((acc, section) => acc + section.questions.length, 0);
            return (
               <Grid item xs={12} sm={6} md={4} key={assessment.id}>
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
                   style={{ height: '100%' }}
                >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}><AssignmentIcon /></Avatar>
                        <Typography variant="h6" component="h2">{assessment.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                      {assessment.description ? (assessment.description.length > 100 ? `${assessment.description.substring(0, 100)}...` : assessment.description) : 'No description available.'}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                     <Chip label={`${totalQuestions} Questions`} size="small" color="primary" variant="outlined"/>
                  </CardContent>
                   <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
                       <Button component={Link} to={`/assessments/builder/${assessment.id}`} fullWidth variant="outlined" size="small">
                        Edit
                      </Button>
                      <IconButton onClick={() => handleDeleteClick(assessment)} color="error" size="small" aria-label="delete assessment">
                        <DeleteIcon />
                    </IconButton>
                   </Box>
                </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      );
    };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">Assessments</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/assessments/builder')}>
            Create Assessment
          </Button>
        </Box>
      </motion.div>

      <Paper sx={{ p: 3, mb: 3, position: 'sticky', top: '70px', zIndex: 10 }}>
        <TextField
          fullWidth
          placeholder="Search assessments by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),}}
        />
      </Paper>
      
      {renderContent()}

      <ConfirmationDialog
        open={!!assessmentToDelete}
        onClose={() => setAssessmentToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Assessment?"
        description={`Are you sure you want to permanently delete the "${assessmentToDelete?.title}" assessment? This action cannot be undone.`}
      />
    </Container>
  );
};

export default AssessmentsPage;

