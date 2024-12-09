'use client';

import React from 'react';
import Image from 'next/image';
import { MovieDetail } from '@/types/movie';
import { useTheme } from '@/context/theme-context';

export default function MovieDetailContent({ movie }: { movie: MovieDetail }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen p-6 ${isDarkMode ? 'bg-bg-dark text-text-primary' : 'bg-[#eeebe3] text-gray-800'}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mr-8">
          <Image
            priority={true}
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
            alt={movie.Title}
            width={300}
            height={450}
            className="w-full rounded-lg shadow-lg object-cover"
            blurDataURL="/blur-image.png"
            placeholder="blur"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-display font-bold mb-4">{movie.Title}</h1>
          <div className="mb-4 space-x-4">
            <span
              className={`px-3 py-1 rounded ${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'}`}
            >
              {movie.Year}
            </span>
            <span
              className={`px-3 py-1 rounded ${isDarkMode ? 'bg-bg-light' : 'bg-gray-300'}`}
            >
              {movie.Genre}
            </span>
            <span className="bg-accent-blue px-3 py-1 rounded text-white">
              IMDB: {movie.imdbRating}
            </span>
          </div>
          <p className="text-text-secondary mb-4">{movie.Plot}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-bold">Director</h2>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h2 className="font-bold">Actors</h2>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
