"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error(`Error in ${this.props.sectionName || "component"}:`, error, errorInfo);

    // Call the optional onError callback
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, use the default fallback UI
      return (
        <div className="p-4 rounded-md bg-muted/30 border border-border">
          <h3 className="text-base font-medium mb-2">
            {this.props.sectionName
              ? `${this.props.sectionName} section could not be loaded`
              : "This section could not be loaded"}
          </h3>
          <p className="text-sm text-muted-foreground">
            We're working on fixing this issue. Please check back later.
          </p>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="mt-2 p-2 bg-destructive/10 rounded text-xs font-mono overflow-auto max-h-[100px]">
              {this.state.error.toString()}
            </div>
          )}
        </div>
      );
    }

    // When there's no error, render children normally
    return this.props.children;
  }
}

// HOC for easier usage with functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ErrorBoundaryProps, 'children'> = {}
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary {...options}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
