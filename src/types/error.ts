export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

// ErrorFallback
export interface ErrorFallbackProps {
  error: Error;
  onRetry: () => void;
}
