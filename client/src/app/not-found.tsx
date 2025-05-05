import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
