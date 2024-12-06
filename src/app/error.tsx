'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/theme-context';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-bg-dark text-text-primary' : 'bg-[#eeebe3] text-gray-800'
      }`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-xl mb-6">
          We encountered an unexpected error while loading the page.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className={`px-4 py-2 rounded ${
              isDarkMode
                ? 'bg-bg-light hover:bg-gray-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Try Again
          </button>
          <Link
            href="/"
            className={`px-4 py-2 rounded ${
              isDarkMode
                ? 'bg-accent-blue hover:opacity-80'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
