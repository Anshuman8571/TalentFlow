import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { api } from '../../services/api';
import { Assessment, AssessmentResponse, Question } from '../../types';
import { format } from 'date-fns';

interface AssessmentResultsProps {
  candidateId: string;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ candidateId }) => {
  // Fetch all necessary data in parallel
  const { data: responses, isLoading: isLoadingResponses } = useQuery<AssessmentResponse[]>({
    queryKey: ['assessmentResponses', candidateId],
    queryFn: () => api.assessments.getAssessmentResponses(candidateId),
  });

  const { data: assessmentsResponse, isLoading: isLoadingAssessments } = useQuery<{ data: Assessment[] }>({
    queryKey: ['assessments'],
    queryFn: () => api.assessments.getAssessments(),
  });
  const allAssessments = assessmentsResponse?.data || [];

  if (isLoadingResponses || isLoadingAssessments) {
    return <CircularProgress size={24} />;
  }
  
  if (!responses || responses.length === 0) {
    return <Typography variant="body2" color="text.secondary">No assessments submitted.</Typography>;
  }

  return (
    <Box>
      {responses.map(response => {
        const assessment = allAssessments.find(a => a.id === response.assessmentId);
        if (!assessment) return null;

        // Create a quick lookup map for questions
        const questionsMap = new Map<string, Question>(
          assessment.sections.flatMap(s => s.questions).map(q => [q.id, q])
        );

        return (
          <Accordion key={response.id} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }}>{assessment.title}</Typography>
                <Chip label={`Submitted: ${format(new Date(response.submittedAt), 'PP')}`} size="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {response.answers.map(answer => {
                const question = questionsMap.get(answer.questionId);
                if (!question) return null;

                return (
                  <Box key={answer.questionId} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{question.text}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2, borderLeft: 2, borderColor: 'divider' }}>
                      {Array.isArray(answer.value) ? answer.value.join(', ') : String(answer.value)}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default AssessmentResults;
