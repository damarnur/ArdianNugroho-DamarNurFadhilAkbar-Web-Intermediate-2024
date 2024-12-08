// src/app/movies/page.tsx
import { Metadata } from 'next';
import { searchMovies, getAllMovies } from '@/lib/api';
import MovieList from '@/app/components/MovieList';

export const metadata: Metadata = {
  title: 'Movie Collection - Browse and Discover',
  description: 'Explore our extensive collection of movies across various genres.',
};

export const revalidate = 3600;

type MoviesPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || '';
  const page = parseInt(resolvedParams?.page || '1', 10);

  let movies = [];
  let totalResults = 0;

  try {
    if (query) {
      const searchData = await searchMovies(query, page);
      movies = searchData.Search || [];
      totalResults = parseInt(searchData.totalResults || '0');
    } else {
      const response = await getAllMovies(page);
      movies = response.movies;
      totalResults = response.totalResults;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  return (
    <MovieList initialMovies={movies} initialPage={page} totalResults={totalResults} />
  );
}
