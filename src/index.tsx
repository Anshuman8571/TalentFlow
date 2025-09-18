import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeMockDatabase, worker } from './mocks/browser';

async function enableMocking() {
  // Enable mocking in both development and production for demo purposes
  // In a real application, you would only enable this in development
  
  // Initialize the database BEFORE the worker starts.
  await initializeMockDatabase();
 
  // Start the mock service worker
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      {/* The Router is placed here at the highest level.
        The 'future' prop is added to opt-in to v7 features and remove the warning.
      */}
      <BrowserRouter future={{ v7_startTransition: true }}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
