"use client";

import React from "react";
import { ErrorBoundary } from "./error-boundary";

interface DataLoaderProps<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: (data: T) => React.ReactNode;
}

export function DataLoader<T>({
  isLoading,
  error,
  data,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: DataLoaderProps<T>) {
  // Default loading component
  const defaultLoadingComponent = (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );

  // Default error component
  const defaultErrorComponent = (
    <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20">
      <h3 className="text-base font-medium mb-2 text-destructive">Error loading data</h3>
      <p className="text-sm text-muted-foreground">{error}</p>
    </div>
  );

  // Default empty component
  const defaultEmptyComponent = (
    <div className="p-4 rounded-md bg-muted/30 border border-border">
      <p className="text-sm text-muted-foreground">No data available</p>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return loadingComponent || defaultLoadingComponent;
  }

  // Show error state
  if (error) {
    return errorComponent || defaultErrorComponent;
  }

  // Show empty state
  if (!data) {
    return emptyComponent || defaultEmptyComponent;
  }

  // Render children with data
  return (
    <ErrorBoundary>
      {children(data)}
    </ErrorBoundary>
  );
}

// HOC for easier usage with functional components
export function withDataLoader<P extends object, T>(
  Component: React.ComponentType<P & { data: T }>,
  options: Omit<DataLoaderProps<T>, 'children' | 'data'> & { getData: () => { data: T | null; isLoading: boolean; error: string | null } }
) {
  return function WithDataLoader(props: P) {
    const { data, isLoading, error } = options.getData();
    
    return (
      <DataLoader
        isLoading={isLoading}
        error={error}
        data={data}
        loadingComponent={options.loadingComponent}
        errorComponent={options.errorComponent}
        emptyComponent={options.emptyComponent}
      >
        {(loadedData) => <Component {...props} data={loadedData} />}
      </DataLoader>
    );
  };
}
