import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// FIX: Import the main 'api' object instead of the non-existent 'assessmentsApi'.
import { api } from '../services/api';
import { Assessment } from '../types';

export const useAssessments = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: assessmentsResponse, isLoading: isLoadingAssessments, isError: assessmentsError } = useQuery({
    queryKey: ['assessments'],
    // FIX: Call the API function using the correct path: api.assessments.getAssessments
    queryFn: () => api.assessments.getAssessments(),
  });
  const assessments = assessmentsResponse?.data || [];

  const { data: assessment, isLoading: isLoadingAssessment, isError: assessmentError } = useQuery<Assessment>({
    queryKey: ['assessment', id],
    queryFn: () => api.assessments.getAssessment(id!),
    enabled: !!id,
  });

  const createAssessmentMutation = useMutation({
    mutationFn: (newAssessment: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>) => api.assessments.createAssessment(newAssessment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
    },
  });

  const updateAssessmentMutation = useMutation({
    mutationFn: (data: { id: string; assessment: Partial<Assessment> }) => api.assessments.updateAssessment(data.id, data.assessment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['assessment', variables.id] });
    },
  });

  return {
    assessments,
    isLoadingAssessments,
    assessmentsError,
    assessment,
    isLoadingAssessment,
    assessmentError,
    createAssessment: createAssessmentMutation.mutateAsync,
    updateAssessment: updateAssessmentMutation.mutateAsync,
    isCreating: createAssessmentMutation.isPending,
    isUpdating: updateAssessmentMutation.isPending,
  };
};