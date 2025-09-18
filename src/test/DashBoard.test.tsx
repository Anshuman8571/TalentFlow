import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

// Mock the useNavigate hook since this component uses it.
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Dashboard Component', () => {
  test('renders the welcome message and feature cards after animation', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // FIX: Use `findByRole` to wait for the animated heading to appear.
    // The 'await' keyword is crucial here.
    const heading = await screen.findByRole('heading', { name: /welcome to talentflow/i });
    expect(heading).toBeInTheDocument();

    // After the heading appears, we can synchronously check for the other static elements.
    expect(screen.getByText(/manage jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/candidate pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/build assessments/i)).toBeInTheDocument();
  });
});

