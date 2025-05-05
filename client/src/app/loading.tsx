export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin mb-4"></div>
        <h2 className="text-xl font-medium">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  );
}
