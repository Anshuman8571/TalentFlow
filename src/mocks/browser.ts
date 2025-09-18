import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import db from '../services/db';
import { initializeDatabase } from './seedData';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

// Initialize the database with seed data when the app starts
export const initializeMockDatabase = async () => {
  try {
    // Check if the database is empty
    const jobCount = await db.jobs.count();
    
    if (jobCount === 0) {
      console.log('Initializing database with seed data...');
      await initializeDatabase(db);
    } else {
      console.log('Database already contains data, skipping initialization');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};