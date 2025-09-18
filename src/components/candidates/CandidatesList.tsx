import React, { useState, useMemo } from 'react';
import {
  Grid,
  Box,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Candidate, HiringStage } from '../../types';
import CandidateCard from './CandidateCard';
import { motion } from 'framer-motion';

interface CandidatesListProps {
  candidates: Candidate[];
}

const CandidatesList: React.FC<CandidatesListProps> = ({ candidates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<HiringStage | 'all'>('all');
  const hiringStages: HiringStage[] = ['Applied', 'Screening', 'Technical', 'Managerial', 'HR', 'Offer', 'Hired', 'Rejected'];

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => 
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (stageFilter === 'all' || c.currentStage === stageFilter)
    );
  }, [candidates, searchTerm, stageFilter]);

  return (
    <Box>
      <Paper sx={{p: 3, mb: 3}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
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
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredCandidates.length} of {candidates.length} candidates.
      </Typography>

      {filteredCandidates.length > 0 ? (
        <Grid container spacing={3}>
          {filteredCandidates.map((c, index) => 
            <Grid item key={c.id} xs={12} sm={6} md={4}>
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
              >
                  <CandidateCard candidate={c} />
              </motion.div>
            </Grid>
          )}
        </Grid>
      ) : (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No candidates found matching your criteria.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CandidatesList;
