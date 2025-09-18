import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Candidate, Note, HiringStage } from '../types';

export const useCandidates = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: candidatesResponse, isLoading: isLoadingCandidates, isError: candidatesListError } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates(),
  });
  const candidates = candidatesResponse?.data || [];

  const { data: candidate, isLoading: isLoadingCandidate, error: candidateDetailError } = useQuery<Candidate>({
    queryKey: ['candidate', id],
    queryFn: () => api.candidates.getCandidate(id!),
    enabled: !!id,
  });

  const addNoteMutation = useMutation({
    mutationFn: (data: { candidateId: string; note: Omit<Note, 'id' | 'candidateId' | 'createdAt'> }) =>
      api.candidates.addNote(data.candidateId, data.note),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidate', variables.candidateId] });
    },
  });

  const updateStageMutation = useMutation({
    mutationFn: (data: { candidateId: string; stage: HiringStage }) =>
      api.candidates.updateCandidateStage(data.candidateId, data.stage),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidate', variables.candidateId] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });

  return {
    candidates,
    isLoadingCandidates,
    candidatesListError,
    candidate,
    isLoadingCandidate,
    candidateError: candidateDetailError,
    addNote: addNoteMutation.mutate,
    isAddingNote: addNoteMutation.isPending,
    updateStage: updateStageMutation.mutate,
    // FIX: The isPending state from the updateStageMutation was not being returned.
    // It is now correctly exported as isUpdatingCandidateStage.
    isUpdatingCandidateStage: updateStageMutation.isPending,
  };
};