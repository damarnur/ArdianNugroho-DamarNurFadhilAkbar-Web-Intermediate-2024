'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchMovies } from '@/lib/api';
import { Movie } from '@/types/movie';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

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

  const totalPages = Math.ceil(totalResults / 20);

  return (
    <div className="container mx-auto p-6">
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
            <div className="bg-bg-light rounded-lg overflow-hidden shadow-lg">
              <Image
                priority={true}
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                alt={movie.Title}
                width={300}
                height={300}
                className="w-96 h-96"
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
      {totalResults > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="bg-bg-light px-4 py-2 rounded hover:bg-accent-blue"
            >
              Previous
            </button>
          )}
          <span className="text-lg">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="bg-bg-light px-4 py-2 rounded hover:bg-accent-blue"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
