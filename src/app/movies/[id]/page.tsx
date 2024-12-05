// app/movies/[id]/page.tsx
import { Suspense } from 'react';
import { getMovieById } from '@/lib/api'; // Replace with your actual API path
import LoadingSpinner from '@/app/components/LoadingSpinner';
import MovieDetailContent from '@/app/components/MovieDetailContent';

// Main Page Component
export default async function MovieDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // Await the params object
  const movie = await getMovieById(id); // Fetch movie data by ID

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MovieDetailContent movie={movie} />
    </Suspense>
  );
}
