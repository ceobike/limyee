/**
 * Error handling utilities
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  errors: Record<string, string>;
  
  constructor(message: string, errors: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Handle API errors in a consistent way
 * @param error The error to handle
 * @returns Formatted error object
 */
export function handleApiError(error: unknown): { message: string; status?: number; errors?: Record<string, string> } {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status
    };
  }
  
  if (error instanceof ValidationError) {
    return {
      message: error.message,
      errors: error.errors
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message
    };
  }
  
  return {
    message: 'An unknown error occurred'
  };
}

/**
 * Log errors to the console or an error tracking service
 * @param error The error to log
 * @param context Additional context information
 */
export function logError(error: unknown, context: Record<string, any> = {}): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    console.error('Context:', context);
  } else {
    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error, { extra: context });
    
    // For now, just log to console
    console.error('Error occurred:', error);
  }
}

/**
 * Retry a function with exponential backoff
 * @param fn The function to retry
 * @param maxRetries Maximum number of retries
 * @param baseDelay Base delay in milliseconds
 * @returns Promise that resolves with the function result or rejects after max retries
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 300
): Promise<T> {
  let lastError: unknown;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      
      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}
