import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  Paper,
  Grid
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Job, JobStatus, Candidate } from '../../types';
import JobCard from './JobCard';
import JobModal from './JobModal';
import { api } from '../../services/api';
import { useStore } from '../../store';

const ITEMS_PER_PAGE = 5;

// Define the expected shape of the API response
interface JobsApiResponse {
  data: Job[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const JobsBoard: React.FC = () => {
  // Global state
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setError = useStore((state) => state.setError);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Get query client for cache updates
  const queryClient = useQueryClient();
  
  // Fetch jobs
  const { data: response, isLoading, error } = useQuery<JobsApiResponse>({
    queryKey: ['jobs', page, searchTerm, statusFilter, tagFilter],
    queryFn: () => api.jobs.getJobs({ page, limit: ITEMS_PER_PAGE, status: statusFilter === 'all' ? undefined : statusFilter, title: searchTerm, tag: tagFilter || undefined }),
  });

  const jobs = response?.data || [];

  // Fetch candidates for job statistics
  const { data: candidatesResponse } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => api.candidates.getCandidates(),
  });

  const candidates = candidatesResponse?.data || [];

  // Fetch all jobs for the tag filter dropdown (without pagination)
  const { data: allJobsResponse } = useQuery<JobsApiResponse>({
    queryKey: ['allJobsForTags'],
    queryFn: () => api.jobs.getJobs(),
  });
  const allTags: string[] = Array.from(new Set(allJobsResponse?.data?.flatMap((job: Job) => job.tags) || []));

  // Update global loading state
  useEffect(() => {
    setIsLoading(isLoading);
    if (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch jobs');
    }
  }, [isLoading, error, setIsLoading, setError]);
  
  // Create job mutation
  const createJobMutation = useMutation({
    // FIX: Aligned the parameter type with the API's expectation.
    mutationFn: (newJob: Omit<Job, 'id'>) => api.jobs.createJob(newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['allJobsForTags'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to create job');
    },
  });
  
  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: (job: Partial<Job> & { id: string }) => api.jobs.updateJob(job.id, job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['allJobsForTags'] });
      setIsModalOpen(false);
      setSelectedJob(null);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update job');
    },
  });

  // Reusable mutation for updating job status (archive/unarchive)
  const updateJobStatusMutation = useMutation({
    mutationFn: (job: { id: string; status: JobStatus }) => api.jobs.updateJob(job.id, { status: job.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update job status');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
  
  // Reorder jobs mutation
  const reorderJobsMutation = useMutation({
    mutationFn: (jobIds: string[]) => api.jobs.reorderJobs(jobIds),
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to reorder jobs');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
  
  const sortedJobs = [...jobs].sort((a, b) => a.order - b.order);
  
  const totalPages = response?.meta?.totalPages || 1;
  
  // Handle opening the modal for creating a new job
  const handleCreateJob = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };
  
  // Handle opening the modal for editing a job
  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  
  const handleUpdateStatus = (job: Job, status: JobStatus) => {
    // Optimistic update
    queryClient.setQueryData<JobsApiResponse>(['jobs', page, searchTerm, statusFilter, tagFilter], (oldData) => {
      if (!oldData) {
        return oldData;
      }
      const newData = oldData.data.map(j => (j.id === job.id ? { ...j, status } : j));
      return { ...oldData, data: newData };
    });
    updateJobStatusMutation.mutate({ id: job.id, status });
  };
  
  const handleSubmitJob = (data: Partial<Job>) => {
    if (selectedJob) {
      updateJobMutation.mutate({ id: selectedJob.id, ...data });
    } else {
      // FIX: Use a type assertion to confirm the form data matches the required type for a new job.
      createJobMutation.mutate(data as Omit<Job, 'id'>);
    }
  };
  
  const sensors = useSensors(
    useSensor(PointerSensor)
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedJobs.findIndex(job => job.id === active.id);
      const newIndex = sortedJobs.findIndex(job => job.id === over.id);
      
      const newOrderJobs = [...sortedJobs];
      const [movedItem] = newOrderJobs.splice(oldIndex, 1);
      newOrderJobs.splice(newIndex, 0, movedItem);
      
      const updatedJobsWithOrder = newOrderJobs.map((job, index) => ({ ...job, order: index }));

      // Optimistic update
      queryClient.setQueryData<JobsApiResponse>(['jobs', page, searchTerm, statusFilter, tagFilter], (oldData) => {
        if (!oldData) {
            return oldData;
        }
        return { ...oldData, data: updatedJobsWithOrder };
      });
      
      reorderJobsMutation.mutate(updatedJobsWithOrder.map(job => job.id));
    }
  };
  
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, tagFilter]);
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Active Jobs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your job postings and track applications
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {jobs.length} total jobs • {jobs.filter(job => job.status === 'active').length} active
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleCreateJob}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Add New Job
          </Button>
        </Box>
      </Box>
      
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Tag</InputLabel>
              <Select
                value={tagFilter || ''}
                label="Filter by Tag"
                onChange={(e) => setTagFilter(e.target.value || null)}
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="">All Tags</MenuItem>
                {allTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Chip label={tag} size="small" sx={{ mr: 1 }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTagFilter(null);
              }}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: 500,
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Jobs Grid */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
            border: '1px solid #e57373',
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Error loading jobs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error instanceof Error ? error.message : 'Failed to load jobs. Please try again.'}
          </Typography>
        </Paper>
      ) : sortedJobs.length === 0 ? (
        <Paper 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
            border: '1px solid #ba68c8',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#7b1fa2' }}>
            No jobs found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm || statusFilter !== 'all' || tagFilter 
              ? 'Try adjusting your search criteria or filters.'
              : 'Get started by creating your first job posting.'
            }
          </Typography>
          {!searchTerm && statusFilter === 'all' && !tagFilter && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleCreateJob}
              sx={{ mt: 2 }}
            >
              Create First Job
            </Button>
          )}
        </Paper>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={sortedJobs.map(job => job.id)} strategy={verticalListSortingStrategy}>
            <Grid container spacing={3}>
              {sortedJobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                  <JobCard job={job} candidates={candidates} onEdit={handleEditJob} onArchive={() => handleUpdateStatus(job, 'archived')} onUnarchive={() => handleUpdateStatus(job, 'active')} />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      )}
      
      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 500,
                },
              }}
            />
          </Paper>
        </Box>
      )}
      
      <JobModal open={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedJob(null); }} onSubmit={handleSubmitJob} job={selectedJob} isLoading={createJobMutation.isPending || updateJobMutation.isPending} />
    </Box>
  );
};

export default JobsBoard;