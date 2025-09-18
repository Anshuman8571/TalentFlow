import React, { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Pagination,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { api } from '../../services/api';
import { Candidate, HiringStage } from '../../types';
import CandidateCard from '../../components/candidates/CandidateCard';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 20;

interface CandidatesApiResponse {
  data: Candidate[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<HiringStage | 'all'>('all');
  const [page, setPage] = useState(1);

  const { data: response, isLoading, isError } = useQuery<CandidatesApiResponse>({
    queryKey: ['candidates', page, searchTerm, stageFilter],
    queryFn: () => api.candidates.getCandidates({
      page,
      limit: ITEMS_PER_PAGE,
      search: searchTerm || undefined,
      stage: stageFilter === 'all' ? undefined : stageFilter,
    }),
    placeholderData: keepPreviousData, 
  });

  const candidates = response?.data || [];
  const totalPages = response?.meta?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, stageFilter]);

  const hiringStages: HiringStage[] = ['Applied', 'Screening', 'Technical', 'Managerial', 'HR', 'Offer', 'Rejected', 'Hired'];

  const renderContent = () => {
    if (isLoading && !response) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;
    }
    if (isError) {
      return <Alert severity="error">Failed to load candidates.</Alert>;
    }
    if (candidates.length === 0) {
      return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No candidates found</Typography>
        </Box>
      );
    }
    return (
      <Grid container spacing={3}>
        {candidates.map((candidate, index) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index % ITEMS_PER_PAGE) * 0.05 }}
            >
              <CandidateCard candidate={candidate} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* --- REDESIGNED HEADER --- */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md="auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Typography variant="h4" component="h1">
                Candidate Pipeline
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth size="small">
                  <InputLabel>Filter by Stage</InputLabel>
                  <Select
                    value={stageFilter}
                    label="Filter by Stage"
                    onChange={(e) => setStageFilter(e.target.value as HiringStage | 'all')}
                  >
                    <MenuItem value="all">All Stages</MenuItem>
                    {hiringStages.map((stage) => (
                      <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {renderContent()}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default CandidatesPage;