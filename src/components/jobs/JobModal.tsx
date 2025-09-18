import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Job, JobStatus } from '../../types';

interface JobModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Job>) => void;
  job?: Job | null;
  isLoading?: boolean;
}

interface JobFormData {
  title: string;
  slug: string;
  description: string;
  status: JobStatus;
  tags: string[];
  location: string;
  department: string;
}

const JobModal: React.FC<JobModalProps> = ({ open, onClose, onSubmit, job, isLoading = false }) => {
  const isEditMode = !!job;
  
  // Available departments and locations (in a real app, these might come from an API)
  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Gurgaon', 'Noida', 'Remote'];
  
  // Set up form with react-hook-form
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<JobFormData>({
    defaultValues: {
      title: job?.title || '',
      slug: job?.slug || '',
      description: job?.description || '',
      status: job?.status || 'active',
      tags: job?.tags || [],
      location: job?.location || '',
      department: job?.department || '',
    },
  });
  
  // Auto-generate slug from title
  const title = watch('title');
  React.useEffect(() => {
    if (!isEditMode && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setValue('slug', generatedSlug);
    }
  }, [title, setValue, isEditMode]);
  
  const handleFormSubmit = (data: JobFormData) => {
    onSubmit({
      ...data,
      updatedAt: new Date().toISOString(),
      ...(isEditMode ? {} : { 
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        order: 0, // Will be set by the backend
      }),
    });
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Job' : 'Create New Job'}</DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  disabled={isLoading}
                />
              )}
            />
            
            <Controller
              name="slug"
              control={control}
              rules={{ 
                required: 'Slug is required',
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: 'Slug can only contain lowercase letters, numbers, and hyphens',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Slug"
                  fullWidth
                  error={!!errors.slug}
                  helperText={errors.slug?.message || 'Used in the URL, must be unique'}
                  disabled={isLoading}
                />
              )}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="department"
                control={control}
                rules={{ required: 'Department is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.department}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      {...field}
                      label="Department"
                      disabled={isLoading}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                    {errors.department && (
                      <FormHelperText>{errors.department.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.location}>
                    <InputLabel>Location</InputLabel>
                    <Select
                      {...field}
                      label="Location"
                      disabled={isLoading}
                    >
                      {locations.map((loc) => (
                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                      ))}
                    </Select>
                    {errors.location && (
                      <FormHelperText>{errors.location.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
            
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={isLoading}
                />
              )}
            />
            
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                      helperText="Press Enter to add a tag"
                    />
                  )}
                  disabled={isLoading}
                />
              )}
            />
            
            {isEditMode && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      label="Status"
                      disabled={isLoading}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : isEditMode ? 'Update Job' : 'Create Job'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JobModal;