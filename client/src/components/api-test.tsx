"use client";

import { useEffect, useState } from "react";

interface ApiTestProps {
  endpoint: string;
  params?: Record<string, string>;
}

export function ApiTest({ endpoint, params = {} }: ApiTestProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build URL with query parameters
        const url = new URL(endpoint, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
        
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('API fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return (
    <div className="p-4 bg-card rounded-md border">
      <h3 className="font-medium mb-2">API Test: {endpoint}</h3>
      
      {isLoading && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <div className="h-4 w-4 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
          <span>Loading data...</span>
        </div>
      )}
      
      {error && (
        <div className="p-2 bg-destructive/10 text-destructive rounded mb-2 text-sm">
          {error}
        </div>
      )}
      
      {data && !isLoading && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Response:</span>
            <span className="text-xs bg-primary/10 px-2 py-0.5 rounded">
              Status: {data.error ? 'Error' : 'Success'}
            </span>
          </div>
          <pre className="text-xs bg-black/5 p-2 rounded overflow-auto max-h-[200px]">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
