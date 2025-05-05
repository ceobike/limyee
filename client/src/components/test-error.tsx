"use client";

import { useEffect, useState } from "react";

export function TestError({ shouldError = false }: { shouldError?: boolean }) {
  const [hasError, setHasError] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Test API call
  useEffect(() => {
    const fetchApiTest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/test');
        const data = await response.json();
        setApiResponse(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('API test failed:', error);
        setApiResponse('API test failed: ' + (error instanceof Error ? error.message : String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiTest();
  }, []);

  // Error simulation
  useEffect(() => {
    // Only set error state on client side after component is mounted
    if (shouldError) {
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        setHasError(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [shouldError]);

  if (hasError) {
    throw new Error("This is a test error");
  }

  return (
    <div className="p-4 bg-primary/10 rounded-md">
      <h3 className="font-medium mb-2">Test Component</h3>
      <p className="mb-2">This component is working correctly.</p>

      <div className="mt-4 border-t pt-2">
        <h4 className="text-sm font-medium mb-1">API Test:</h4>
        {isLoading ? (
          <p className="text-sm">Loading API response...</p>
        ) : apiResponse ? (
          <pre className="text-xs bg-black/5 p-2 rounded overflow-auto max-h-[100px]">{apiResponse}</pre>
        ) : (
          <p className="text-sm">No API response yet</p>
        )}
      </div>
    </div>
  );
}
