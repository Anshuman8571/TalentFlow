import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import { api } from '../../services/api';
import { Assessment, AssessmentResponse, Question } from '../../types';
import { format } from 'date-fns';

interface AssessmentResultsProps {
  candidateId: string;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ candidateId }) => {
  // Fetch the candidate's submitted responses
  const { data: responses, isLoading: isLoadingResponses, isError: isErrorResponses } = useQuery<AssessmentResponse[]>({
    queryKey: ['assessmentResponses', candidateId],
    queryFn: () => api.assessments.getAssessmentResponses(candidateId),
  });

  // Fetch all assessments to get the question details and correct answers
  const { data: assessmentsResponse, isLoading: isLoadingAssessments } = useQuery<{ data: Assessment[] }>({
    queryKey: ['assessments'],
    queryFn: () => api.assessments.getAssessments(),
  });

  // Memoize the grading logic to prevent re-calculation on every render
  const gradedResults = useMemo(() => {
    const allAssessments = assessmentsResponse?.data || [];
    if (!responses || !allAssessments.length) return [];

    return responses.map(response => {
      const assessment = allAssessments.find(a => a.id === response.assessmentId);
      if (!assessment) return null;

      const questionsMap = new Map<string, Question>(
        assessment.sections.flatMap(s => s.questions).map(q => [q.id, q])
      );
      
      let correctCount = 0;
      const totalGradableQuestions = Array.from(questionsMap.values()).filter(q => q.type === 'single-choice' || q.type === 'multi-choice').length;

      const gradedAnswers = response.answers.map(answer => {
        const question = questionsMap.get(answer.questionId);
        if (!question) {
            return { ...answer, isCorrect: null, question: { text: 'Error: Question not found.' } as Question };
        }

        let isCorrect: boolean | null = null; // null for non-gradable questions
        if (question.type === 'single-choice') {
          isCorrect = question.correctAnswer === answer.value;
        } else if (question.type === 'multi-choice' && question.correctAnswers) {
          const correct = new Set(question.correctAnswers);
          const submitted = new Set(answer.value || []);
          isCorrect = correct.size === submitted.size && Array.from(correct).every(item => submitted.has(item));
        }

        if (isCorrect === true) correctCount++;
        
        return { ...answer, isCorrect, question };
      });

      return {
        response,
        assessment,
        gradedAnswers,
        score: `${correctCount} / ${totalGradableQuestions}`,
      };
    }).filter(Boolean);
  }, [responses, assessmentsResponse]);

  if (isLoadingResponses || isLoadingAssessments) {
    return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress size={24} /></Box>;
  }
  
  if (isErrorResponses) {
      return <Alert severity="warning">Could not load assessment results.</Alert>;
  }

  if (!gradedResults || gradedResults.length === 0) {
    return <Typography variant="body2" color="text.secondary">No assessments submitted.</Typography>;
  }

  return (
    <Box>
      {gradedResults.map(result => (
        <Accordion key={result!.response.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>{result!.assessment.title}</Typography>
              <Chip label={`Score: ${result!.score}`} size="small" color="primary" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption" color="text.secondary">
                Submitted: {format(new Date(result!.response.submittedAt), 'PPp')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List dense>
              {result!.gradedAnswers.map(answer => (
                <ListItem key={answer.questionId} divider>
                  <ListItemIcon sx={{minWidth: '40px'}}>
                    {answer.isCorrect === true && <CheckCircleIcon color="success" />}
                    {answer.isCorrect === false && <CancelIcon color="error" />}
                    {answer.isCorrect === null && <HelpOutlineIcon color="disabled" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={answer.question.text}
                    secondary={`Answer: ${Array.isArray(answer.value) ? answer.value.join(', ') : String(answer.value)}`}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AssessmentResults;

