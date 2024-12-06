import { Metadata } from 'next';
import { searchMovies, getAllMovies } from '@/lib/api';
import MovieList from '../components/MovieList';

export const metadata: Metadata = {
  title: 'Movie Collection - Browse and Discover',
  description: 'Explore our extensive collection of movies across various genres.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query || '';
  const page = parseInt(searchParams.page || '1', 10);

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
