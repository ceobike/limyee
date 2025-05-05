"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold mb-4 text-destructive">Something went wrong!</h2>
        
        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            We're sorry, but there was an error loading this page. Our team has been notified.
          </p>
          
          {process.env.NODE_ENV !== "production" && (
            <div className="bg-destructive/10 p-3 rounded-md text-sm font-mono overflow-auto max-h-[200px] mb-4">
              <p className="font-semibold mb-1">Error:</p>
              <p>{error.message}</p>
              {error.stack && (
                <>
                  <p className="font-semibold mt-2 mb-1">Stack:</p>
                  <pre className="text-xs whitespace-pre-wrap">{error.stack}</pre>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            Go Home
          </button>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
