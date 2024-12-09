'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useTheme } from '@/context/theme-context';

export default function MovieList({
  initialMovies,
  initialPage,
  totalResults,
}: {
  initialMovies: Movie[];
  initialPage: number;
  totalResults: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const { isDarkMode } = useTheme();

  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(totalResults / 10);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/movies?${params.toString()}`);
    setPage(newPage);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkMode ? 'bg-bg-dark text-text-primary' : 'bg-[#eeebe3] text-gray-800'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display">
          {query ? `Search Results for "${query}"` : 'All Movies'}
        </h1>
      </div>

      {initialMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {initialMovies.map((movie) => (
              <Link
                key={movie.imdbID}
                href={`/movies/${movie.imdbID}`}
                className="hover:scale-105 transition-transform"
              >
                <div
                  className={`rounded-lg overflow-hidden shadow-lg ${
                    isDarkMode ? 'bg-bg-light' : 'bg-white'
                  }`}
                >
                  <Image
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                    alt={movie.Title}
                    width={300}
                    height={300}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
                    <p className="text-text-secondary">{movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className={`px-3 py-2 rounded ${
                page === 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : `${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`
              }`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-2 rounded ${
                page === 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : `${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded ${
                page === totalPages
                  ? 'bg-gray-200 cursor-not-allowed'
                  : `${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`
              }`}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded ${
                page === totalPages
                  ? 'bg-gray-200 cursor-not-allowed'
                  : `${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`
              }`}
            >
              Last
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-xl">No movies found</div>
      )}
    </div>
  );
}
