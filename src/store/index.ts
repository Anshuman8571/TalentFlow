import { create } from 'zustand';

// Define and export the shape of a single notification
// so other components can use this type.
export interface AppNotification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
  linkTo?: string; // Optional link to navigate to the relevant page
}

// Define the shape of the entire global state
interface AppState {
  isLoading: boolean;
  error: string | null;
  notifications: AppNotification[];
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void; // Added for better error management
  addNotification: (message: string, linkTo?: string) => void;
  markNotificationsAsRead: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  isLoading: false,
  error: null,
  notifications: [],

  // Actions to update the state
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  addNotification: (message, linkTo) => {
    const newNotification: AppNotification = {
      id: crypto.randomUUID(),
      message,
      read: false,
      timestamp: new Date().toISOString(),
      linkTo,
    };
    // Add the new notification to the beginning of the array for chronological order
    set({ notifications: [newNotification, ...get().notifications] });
  },

  markNotificationsAsRead: () => {
    // Creates a new array with all notifications marked as read
    set({
      notifications: get().notifications.map(n => ({ ...n, read: true })),
    });
  },
}));

