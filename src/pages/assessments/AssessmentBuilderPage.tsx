import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  // FIX: Import the missing CircularProgress component
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { api } from '../../services/api';
import { Assessment, QuestionType, Job } from '../../types';

type AssessmentFormData = Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>;

const questionTypeOptions: { value: QuestionType, label: string }[] = [
    { value: 'text', label: 'Text Input' },
    { value: 'single-choice', label: 'Single Choice' },
    { value: 'multi-choice', label: 'Multiple Choice' },
    { value: 'numeric', label: 'Numeric Input' },
    { value: 'file-upload', label: 'File Upload (Stub)' },
];


const AssessmentBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const { data: jobsResponse } = useQuery<{ data: Job[] }>({
    queryKey: ['jobs'],
    queryFn: () => api.jobs.getJobs(),
  });
  const jobs = jobsResponse?.data || [];

  const { data: existingAssessment, isLoading: isLoadingAssessment } = useQuery<Assessment>({
    queryKey: ['assessment', id],
    queryFn: () => api.assessments.getAssessment(id!),
    enabled: isEditing,
  });

  const { control, handleSubmit, register, watch, reset } = useForm<AssessmentFormData>({
    defaultValues: {
      title: '',
      description: '',
      jobId: '',
      sections: [{ id: crypto.randomUUID(), title: 'Section 1', description: '', questions: [] }]
    }
  });

  useEffect(() => {
    if (isEditing && existingAssessment) {
      reset(existingAssessment);
    }
  }, [isEditing, existingAssessment, reset]);

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: 'sections'
  });

  const mutation = useMutation({
    mutationFn: (data: AssessmentFormData) => {
      return isEditing 
        ? api.assessments.updateAssessment(id!, data) 
        : api.assessments.createAssessment(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      navigate('/assessments');
    }
  });

  const onSubmit = (data: AssessmentFormData) => {
    mutation.mutate(data);
  };
  
  const watchedFormData = watch();

  if (isLoadingAssessment) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
       <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/assessments')} sx={{ mb: 2 }}>
        Back to Assessments
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {isEditing ? 'Edit Assessment' : 'Create New Assessment'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
            {/* Left side: Form Builder */}
            <Grid item xs={12} md={7}>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Basic Information</Typography>
                    <TextField fullWidth label="Assessment Title" {...register('title', { required: true })} sx={{ my: 2 }} />
                     <Controller
                        name="jobId"
                        control={control}
                        rules={{ required: 'You must associate this assessment with a job.'}}
                        render={({ field, fieldState }) => (
                           <FormControl fullWidth sx={{ mb: 2 }} error={!!fieldState.error}>
                                <InputLabel>Associated Job</InputLabel>
                                <Select {...field} label="Associated Job">
                                    {jobs.filter(j => j.status === 'active').map(job => (
                                        <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
                                    ))}
                                </Select>
                                {fieldState.error && <Typography color="error" variant="caption">{fieldState.error.message}</Typography>}
                           </FormControl>
                        )}
                    />
                    <TextField fullWidth label="Description" {...register('description')} multiline rows={3} />
                </Paper>

                {sectionFields.map((section, sectionIndex) => (
                <Paper key={section.id} sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Section {sectionIndex + 1}</Typography>
                        <IconButton onClick={() => removeSection(sectionIndex)} disabled={sectionFields.length <= 1}><DeleteIcon /></IconButton>
                    </Box>
                    <TextField fullWidth label="Section Title" {...register(`sections.${sectionIndex}.title`, { required: true })} sx={{ mb: 2 }}/>
                    <QuestionBuilder control={control} register={register} sectionIndex={sectionIndex} />
                </Paper>
                ))}
                
                {/* FIX: Add a unique ID when creating a new section to match the AssessmentSection type */}
                <Button startIcon={<AddIcon />} onClick={() => appendSection({ id: crypto.randomUUID(), title: `Section ${sectionFields.length + 1}`, description:'', questions: [] })}>
                    Add Section
                </Button>
            </Grid>
            
            {/* Right side: Live Preview */}
            <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, position: 'sticky', top: '80px' }}>
                    <Typography variant="h5" gutterBottom>Live Preview</Typography>
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h4" component="h2">{watchedFormData.title || "Assessment Title"}</Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>{watchedFormData.description || "Your description will appear here."}</Typography>
                    
                    {watchedFormData.sections?.map((section, sectionIndex) => (
                        <Box key={sectionIndex} sx={{ my: 3 }}>
                            <Typography variant="h6" component="h3">{section.title}</Typography>
                            <Divider sx={{ my: 1 }} />
                            {section.questions.map((question, questionIndex) => (
                                <Box key={questionIndex} sx={{ my: 2 }}>
                                    <Typography>{question.text || `Question ${questionIndex + 1}`} {question.required && <span style={{color: 'red'}}>*</span>}</Typography>
                                    {question.type === 'text' && <TextField fullWidth margin="dense" disabled />}
                                    {question.type === 'numeric' && <TextField fullWidth type="number" margin="dense" disabled />}
                                    {question.type === 'single-choice' && (
                                        <FormControl component="fieldset" margin="dense">
                                            <RadioGroup>
                                                {question.options?.map((opt, i) => <FormControlLabel key={i} value={opt} control={<Radio />} label={opt || `Option ${i+1}`} disabled />)}
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                     {question.type === 'multi-choice' && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                                             {question.options?.map((opt, i) => <FormControlLabel key={i} control={<Checkbox />} label={opt || `Option ${i+1}`} disabled />)}
                                        </Box>
                                    )}
                                    {question.type === 'file-upload' && <Button variant="outlined" component="label" sx={{mt: 1}} disabled>Upload File <input type="file" hidden /></Button>}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Paper>
            </Grid>
        </Grid>

        <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Assessment')}
        </Button>
      </form>
    </Container>
  );
};


const QuestionBuilder = ({ control, register, sectionIndex }: { control: any, register: any, sectionIndex: number }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `sections.${sectionIndex}.questions`
    });

    const addQuestion = () => {
        append({ id: crypto.randomUUID(), text: '', type: 'text', required: true, options: [''] });
    };

    return (
        <Box>
            {fields.map((question, questionIndex) => (
                <Paper key={question.id} variant="outlined" sx={{ p: 2, my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">Question {questionIndex + 1}</Typography>
                        <IconButton onClick={() => remove(questionIndex)}><DeleteIcon /></IconButton>
                    </Box>
                    <TextField fullWidth label="Question Text" {...register(`sections.${sectionIndex}.questions.${questionIndex}.text`, { required: true })} sx={{ my: 1 }} />
                    <Controller
                        name={`sections.${sectionIndex}.questions.${questionIndex}.type`}
                        control={control}
                        render={({ field }) => (
                           <FormControl fullWidth sx={{ my: 1 }}>
                                <InputLabel>Question Type</InputLabel>
                                <Select {...field} label="Question Type">
                                    {questionTypeOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                                </Select>
                           </FormControl>
                        )}
                    />

                    <Controller
                        name={`sections.${sectionIndex}.questions.${questionIndex}`}
                        control={control}
                        render={({ field: { value } }) => (
                            <>
                                {(value.type === 'single-choice' || value.type === 'multi-choice') && (
                                    <OptionsBuilder sectionIndex={sectionIndex} questionIndex={questionIndex} control={control} register={register} />
                                )}
                            </>
                        )}
                    />
                     <FormControlLabel
                        control={<Controller name={`sections.${sectionIndex}.questions.${questionIndex}.required`} control={control} render={({field}) => <Checkbox {...field} checked={field.value} />}/>}
                        label="Required"
                    />
                </Paper>
            ))}
            <Button startIcon={<AddIcon />} onClick={addQuestion}>Add Question</Button>
        </Box>
    );
};

const OptionsBuilder = ({ control, register, sectionIndex, questionIndex }: { control: any; register: any; sectionIndex: number; questionIndex: number }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `sections.${sectionIndex}.questions.${questionIndex}.options`
    });

    return (
        <Box sx={{ml: 2, my: 1}}>
            <Typography variant="subtitle2">Options</Typography>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                        {...register(`sections.${sectionIndex}.questions.${questionIndex}.options.${index}`)}
                        size="small"
                        placeholder={`Option ${index + 1}`}
                        fullWidth
                    />
                    <IconButton onClick={() => remove(index)}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
            ))}
            <Button size="small" onClick={() => append('')}>Add Option</Button>
        </Box>
    );
};

export default AssessmentBuilderPage;

