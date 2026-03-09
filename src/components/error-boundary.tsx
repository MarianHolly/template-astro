import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorBoundary({ error, resetError }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log to error reporting service
    if (error) {
      console.error("Component error:", error);
    }
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {resetError && (
            <Button onClick={resetError} size="sm">
              Try again
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href="/">Go to home</a>
          </Button>
        </div>

        {/* Only show in development */}
        {import.meta.env.DEV && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs font-medium">
              Error details (dev only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
