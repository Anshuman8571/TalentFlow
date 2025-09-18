import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// To test the App component, we must wrap it in the necessary providers
// that it expects, like the Router.
test('renders the main application and displays the login page by default', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Since the default route now redirects to /login, we can test
  // that the login page's main heading is visible.
  const loginHeading = screen.getByRole('heading', { name: /log in/i });
  expect(loginHeading).toBeInTheDocument();
});

