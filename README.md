# TalentFlow

TalentFlow is a mini hiring platform built with React, TypeScript, and modern web technologies to streamline the recruitment process. It provides a comprehensive set of features for managing jobs, candidates, and assessments.

## Features

### Jobs Management
- Create, edit, and archive job postings
- Drag-and-drop reordering of jobs
- Detailed job view with all relevant information
- Filter jobs by status and tags
- Search functionality

### Candidates Management (Coming Soon)
- Track candidates through the hiring pipeline
- Kanban board for visualizing candidate progress
- Candidate profiles with education and experience details
- Filter and search capabilities

### Assessments (Coming Soon)
- Build custom assessments with various question types
- Live preview of assessments
- Form runtime for candidates to complete assessments
- Scoring and evaluation tools

## Technology Stack

- **Frontend**: React, TypeScript, Material-UI (MUI)
- **State Management**: Zustand, React Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Drag and Drop**: DnD Kit
- **Animations**: Framer Motion
- **Mock Backend**: MSW (Mock Service Worker)
- **Local Database**: Dexie.js (IndexedDB wrapper)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/talentflow.git
   cd talentflow
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Common components like Layout
│   ├── jobs/         # Job-related components
│   ├── candidates/   # Candidate-related components
│   └── assessments/  # Assessment-related components
├── pages/            # Page components for routing
├── services/         # API and database services
│   ├── api/          # API service for data fetching
│   └── db/           # Dexie.js database configuration
├── store/            # Zustand store for global state
├── theme/            # MUI theme configuration
├── types/            # TypeScript type definitions
├── mocks/            # MSW configuration for API mocking
├── hooks/            # Custom React hooks
└── utils/            # Utility functions
```

## Development

### Mock Backend

The application uses MSW (Mock Service Worker) to simulate a backend API. All API calls are intercepted and handled by MSW, which interacts with a local IndexedDB database powered by Dexie.js.

When the application starts in development mode, it automatically initializes the database with seed data for jobs, candidates, and assessments.

### Adding New Features

1. Define types in `src/types/index.ts`
2. Add API handlers in `src/mocks/handlers.ts`
3. Create components in the appropriate directory
4. Add routes in `src/App.tsx`
5. Update the global store in `src/store/index.ts` if needed

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [MSW](https://mswjs.io/)
- [Dexie.js](https://dexie.org/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [DnD Kit](https://dndkit.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
