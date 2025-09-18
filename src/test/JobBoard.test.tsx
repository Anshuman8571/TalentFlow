import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import JobsBoard from '../components/jobs/JobsBoard';
import { api } from '../services/api';
import { Job } from '../types';

jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests
    },
  },
});

// A helper to wrap components in providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

// Sample mock data
const mockJobs: Job[] = [
  { id: '1', title: 'React Developer', slug: 'react-dev', description: 'desc1', department: 'Eng', location: 'Bangalore', tags: ['React'], status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), order: 0 },
  { id: '2', title: 'Node.js Developer', slug: 'node-dev', description: 'desc2', department: 'Eng', location: 'Pune', tags: ['Node'], status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), order: 1 },
];

describe('JobsBoard', () => {
  beforeEach(() => {
    // FIX: Clear both the Jest mocks and the React Query cache before each test.
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('shows a loading state initially', () => {
    (mockedApi.jobs.getJobs as jest.Mock).mockReturnValue(new Promise(() => {})); // Keep it pending
    render(<AllTheProviders><JobsBoard /></AllTheProviders>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders a list of jobs on successful fetch', async () => {
    (mockedApi.jobs.getJobs as jest.Mock)
      .mockResolvedValueOnce({ data: mockJobs, meta: { totalPages: 1 } }) // For the main job list query
      .mockResolvedValueOnce({ data: mockJobs, meta: { totalPages: 1 } }); // For the allJobsForTags query
    
    render(<AllTheProviders><JobsBoard /></AllTheProviders>);

    expect(await screen.findByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('Node.js Developer')).toBeInTheDocument();
  });

  test('filters jobs based on search term', async () => {
    (mockedApi.jobs.getJobs as jest.Mock)
      .mockResolvedValueOnce({ data: mockJobs, meta: { totalPages: 1 } }) // Initial main list
      .mockResolvedValueOnce({ data: mockJobs, meta: { totalPages: 1 } }); // Initial tag list

    render(<AllTheProviders><JobsBoard /></AllTheProviders>);

    // Wait for the initial data to be displayed
    expect(await screen.findByText('React Developer')).toBeInTheDocument();
    
    // Set up the mock for the *next* API call, which will be the filtered one
    const filteredMock = [mockJobs[1]]; // Only the Node.js job
    (mockedApi.jobs.getJobs as jest.Mock).mockResolvedValueOnce({ data: filteredMock, meta: { totalPages: 1 } });
    
    const searchInput = screen.getByPlaceholderText(/search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'Node.js' } });

    // Wait for the UI to update by checking for the disappearance of the old data
    await waitFor(() => {
      expect(screen.queryByText('React Developer')).not.toBeInTheDocument();
    });

    // FIX: Use an asynchronous 'findByText' to wait for the component to re-render with the filtered data.
    expect(await screen.findByText('Node.js Developer')).toBeInTheDocument();
  });
});