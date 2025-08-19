"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm opacity-80 break-all">
        {process.env.NODE_ENV !== 'production' ? error?.message : 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
      >
        Try again
      </button>
    </div>
  );
}


