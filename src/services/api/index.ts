import { Job, Candidate, Assessment, HiringStage, Note, AssessmentResponse } from '../../types';

// This file simulates a fully-fledged API client.
const API_URL = 'https://api.talentflow.example';

const mockFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, options);
};

// ============================================================================
// JOBS API
// ============================================================================
const getJobs = async (params?: { page?: number; limit?: number; status?: string; title?: string; tag?: string }) => {
  const url = new URL(`${API_URL}/jobs`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  const response = await mockFetch(url.toString());
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
};

const getJob = async (id: string) => {
  const response = await mockFetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch job');
  return response.json().then(res => res.data);
};

// This new function is needed for the public job pages
const getJobBySlug = async (slug: string) => {
  const response = await mockFetch(`${API_URL}/jobs/slug/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch job by slug');
  return response.json().then(res => res.data);
};

const createJob = async (job: Omit<Job, 'id'>) => {
  const response = await mockFetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json().then(res => res.data);
};

const updateJob = async (id: string, job: Partial<Job>) => {
  const response = await mockFetch(`${API_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json().then(res => res.data);
};

const reorderJobs = async (jobIds: string[]) => {
  const response = await mockFetch(`${API_URL}/jobs/reorder`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobIds }),
  });
  if (!response.ok) throw new Error('Failed to reorder jobs');
  return response.json().then(res => res.data);
};


// ============================================================================
// CANDIDATES API
// ============================================================================
const getCandidates = async (params?: { page?: number; limit?: number; stage?: HiringStage; search?: string }) => {
  const url = new URL(`${API_URL}/candidates`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, String(value));
    });
  }
  const response = await mockFetch(url.toString());
  if (!response.ok) throw new Error('Failed to fetch candidates');
  return response.json();
};

const getCandidate = async (id: string) => {
  const response = await mockFetch(`${API_URL}/candidates/${id}`);
  if (!response.ok) throw new Error('Failed to fetch candidate');
  return response.json().then(res => res.data);
};

// This new function is needed for the "Apply" form on public job pages
const createCandidate = async (candidateData: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory' | 'notes'>) => {
    const response = await mockFetch(`${API_URL}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateData),
    });
    if (!response.ok) throw new Error('Failed to create candidate');
    return response.json().then(res => res.data);
};

const addNote = async (candidateId: string, noteData: Omit<Note, 'id' | 'candidateId' | 'createdAt'>) => {
  const response = await mockFetch(`${API_URL}/candidates/${candidateId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  if (!response.ok) throw new Error('Failed to add note');
  return response.json().then(res => res.data);
};

const updateCandidateStage = async (candidateId: string, stage: HiringStage) => {
    const response = await mockFetch(`${API_URL}/candidates/${candidateId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage }),
    });
    if (!response.ok) throw new Error('Failed to update candidate stage');
    return response.json().then(res => res.data);
};

// ============================================================================
// ASSESSMENTS API
// ============================================================================
const getAssessments = async () => {
    const response = await mockFetch(`${API_URL}/assessments`);
    if (!response.ok) throw new Error('Failed to fetch assessments');
    return response.json();
};

const getAssessment = async (id: string) => {
    const response = await mockFetch(`${API_URL}/assessments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch assessment');
    return response.json().then(res => res.data);
};

const createAssessment = async (assessment: Omit<Assessment, 'id'| 'createdAt' | 'updatedAt'>) => {
    const response = await mockFetch(`${API_URL}/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessment),
    });
    if (!response.ok) throw new Error('Failed to create assessment');
    return response.json().then(res => res.data);
};

const updateAssessment = async (id: string, assessment: Partial<Assessment>) => {
    const response = await mockFetch(`${API_URL}/assessments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessment),
    });
    if (!response.ok) throw new Error('Failed to update assessment');
    return response.json().then(res => res.data);
};
const deleteAssessment = async (id: string) => {
    const response = await mockFetch(`${API_URL}/assessments/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete assessment');
    return true;
};
const getAssessmentResponses = async (candidateId: string) => {
    const response = await mockFetch(`${API_URL}/assessment-responses?candidateId=${candidateId}`);
    if (!response.ok) throw new Error('Failed to fetch assessment responses');
    return response.json().then(res => res.data);
};

const submitAssessmentResponse = async (responseData: Omit<AssessmentResponse, 'id' | 'submittedAt'>) => {
    const response = await mockFetch(`${API_URL}/assessment-responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseData),
    });
    if (!response.ok) throw new Error('Failed to submit assessment');
    return response.json().then(res => res.data);
};

export const api = {
  jobs: {
    getJobs,
    getJob,
    createJob,
    updateJob,
    reorderJobs,
    getJobBySlug, // <-- ADD THIS LINE
  },
  candidates: {
    getCandidates,
    getCandidate,
    addNote,
    updateCandidateStage,
    createCandidate, // <-- ADD THIS LINE
  },
  assessments: {
    getAssessments,
    getAssessment,
    createAssessment,
    updateAssessment,
    deleteAssessment,
    getAssessmentResponses,
    submitAssessmentResponse,
  }
};