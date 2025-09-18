import { useState, useCallback } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  initialData?: T;
}

/**
 * A generic hook for making API calls with loading, error, and data states
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setStatus('loading');
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        setStatus('success');
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setStatus('error');
        options.onError?.(error);
        throw error;
      }
    },
    [apiFunction, options]
  );

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle',
  };
}