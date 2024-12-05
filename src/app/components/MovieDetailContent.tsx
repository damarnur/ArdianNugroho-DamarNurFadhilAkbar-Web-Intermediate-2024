import React from 'react';
import Image from 'next/image';
import { MovieDetail } from '@/types/movie';

// Movie Detail Content Component
export default function MovieDetailContent({ movie }: { movie: MovieDetail }) {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row">
      <div className="md:w-1/3 mb-6 md:mr-8">
        <Image
          priority={true}
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
          alt={movie.Title}
          width={300}
          height={450}
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-4xl font-display font-bold mb-4">{movie.Title}</h1>
        <div className="mb-4 space-x-4">
          <span className="bg-bg-light px-3 py-1 rounded">{movie.Year}</span>
          <span className="bg-bg-light px-3 py-1 rounded">{movie.Genre}</span>
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
  );
}
