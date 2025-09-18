import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

// A helper function to render the component within a router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage', () => {
  test('renders the login form correctly', () => {
    renderWithRouter(<LoginPage />);
    
    // Check for main headings
    expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();

    // Check for social login buttons
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with facebook/i })).toBeInTheDocument();
  });

  test('email input validation works', async () => {
    renderWithRouter(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /continue with email/i });

    // Try to submit with an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Expect to see a validation error message
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('switches to phone tab and shows phone input', () => {
    renderWithRouter(<LoginPage />);
    
    const phoneTab = screen.getByRole('tab', { name: /phone number/i });
    fireEvent.click(phoneTab);

    // After clicking the tab, the input label should change
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with phone/i })).toBeInTheDocument();
  });
});
