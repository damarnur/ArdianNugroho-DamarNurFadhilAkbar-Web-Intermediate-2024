'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchMovies } from '@/lib/api';
import { Movie } from '@/types/movie';
import { useTheme } from '@/context/theme-context';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query, page);
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults || '0'));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query, page]);

  return (
    <div
      className={`min-h-screen p-6 ${isDarkMode ? 'bg-bg-dark text-text-primary' : 'bg-[#eeebe3] text-gray-800'}`}
    >
      <h1 className="text-3xl font-display mb-6">
        Search Results for &quot;{query}&quot;
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            href={`/movies/${movie.imdbID}`}
            className="hover:scale-105 transition-transform"
          >
            <div
              className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-bg-light' : 'bg-white'}`}
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
      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`}
          >
            Previous
          </button>
        )}
        {page * 20 < totalResults && (
          <button
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'} hover:opacity-80`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
