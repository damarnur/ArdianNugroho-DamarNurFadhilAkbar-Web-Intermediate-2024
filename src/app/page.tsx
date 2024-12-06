'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/theme-context';
import { getAllMovies } from '@/lib/api';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { isDarkMode } = useTheme();
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const { movies } = await getAllMovies(1);
        setFeaturedMovies(movies.slice(0, 6)); // Get first 6 movies
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch featured movies', error);
        setIsLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-bg-dark text-white' : 'bg-[#eeebe3] text-black'} transition-colors duration-300`}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Explore a world of cinematic adventures. Browse, discover, and dive into amazing
          films from every genre.
        </p>
      </div>

      {/* Featured Movies Section */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Movies</h2>

        {isLoading ? (
          <div className="flex justify-center items-center space-x-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-40 h-60 bg-gray-300 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">
            {featuredMovies.map((movie) => (
              <Link
                key={movie.imdbID}
                href={`/movie/${movie.imdbID}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
                    alt={movie.Title}
                    width={240}
                    height={360}
                    className="w-full h-auto object-cover"
                  />
                  <div className={`p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className="text-sm font-medium truncate">{movie.Title}</p>
                    <p className="text-xs text-gray-500">{movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Element */}
      <div className={`w-full h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    </div>
  );
}
