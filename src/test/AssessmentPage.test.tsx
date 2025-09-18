import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AssessmentsPage from '../pages/assessments/AssessmentsPage';
import { api } from '../services/api';
import { Assessment } from '../types';

jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

// Sample mock data
const mockAssessments: Assessment[] = [
  { id: 'a1', title: 'Frontend Challenge', description: 'Test React skills', jobId: 'j1', sections: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'a2', title: 'Backend Case Study', description: 'Test Node.js skills', jobId: 'j2', sections: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

describe('AssessmentsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows a loading state and then renders assessments', async () => {
    // FIX: Explicitly cast the function to jest.Mock to inform TypeScript of mock-specific methods.
    (mockedApi.assessments.getAssessments as jest.Mock).mockResolvedValue({ data: mockAssessments });

    render(<AllTheProviders><AssessmentsPage /></AllTheProviders>);

    // Initially, it should be loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // After loading, it should display the assessment titles
    expect(await screen.findByText('Frontend Challenge')).toBeInTheDocument();
    expect(screen.getByText('Backend Case Study')).toBeInTheDocument();
  });

  test('shows an error message if the API call fails', async () => {
    // FIX: Apply the same casting for mockRejectedValue.
    (mockedApi.assessments.getAssessments as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<AllTheProviders><AssessmentsPage /></AllTheProviders>);

    // It should display an error alert
    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to load assessments/i);
  });
});
