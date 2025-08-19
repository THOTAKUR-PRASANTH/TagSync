"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-semibold">App crashed</h1>
          <p className="text-sm opacity-80 break-all">
            {process.env.NODE_ENV !== 'production' ? error?.message : 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}


