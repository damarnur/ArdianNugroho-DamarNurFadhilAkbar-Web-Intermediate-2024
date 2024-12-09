// src/app/components/FeaturedMoviesSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { useTheme } from '@/context/theme-context';

export default function FeaturedMoviesSection({
  initialMovies,
}: {
  initialMovies: Movie[];
}) {
  const { isDarkMode } = useTheme();
  const [featuredMovies] = useState(initialMovies);

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">
        {featuredMovies.map((movie) => (
          <Link
            key={movie.imdbID}
            href={`/movies/${movie.imdbID}`}
            className="transform transition-transform hover:scale-105"
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
                alt={movie.Title}
                width={240}
                height={360}
                className="w-full h-auto object-cover"
                blurDataURL="/blur-image.png"
                placeholder="blur"
              />
              <div className={`p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className="text-sm font-medium truncate">{movie.Title}</p>
                <p className="text-xs text-gray-500">{movie.Year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
