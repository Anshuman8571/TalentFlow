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
import { Job, JobStatus } from '../../types';
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
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Jobs Board</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateJob}>Add New Job</Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Tag</InputLabel>
              <Select value={tagFilter || ''} label="Filter by Tag" onChange={(e) => setTagFilter(e.target.value || null)}>
                <MenuItem value="">All Tags</MenuItem>
                {allTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Chip label={tag} size="small" sx={{ mr: 1 }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress />
      </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>Failed to load jobs. Please try again.</Alert>
      ) : sortedJobs.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>No jobs found matching your filters.</Alert>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={sortedJobs.map(job => job.id)} strategy={verticalListSortingStrategy}>
            <Box sx={{ mb: 3 }}>
              {sortedJobs.map((job) => (
                <JobCard key={job.id} job={job} onEdit={handleEditJob} onArchive={() => handleUpdateStatus(job, 'archived')} onUnarchive={() => handleUpdateStatus(job, 'active')} />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={totalPages} page={page} onChange={(_, newPage) => setPage(newPage)} color="primary" />
        </Box>
      )}
      
      <JobModal open={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedJob(null); }} onSubmit={handleSubmitJob} job={selectedJob} isLoading={createJobMutation.isPending || updateJobMutation.isPending} />
    </Box>
  );
};

export default JobsBoard;