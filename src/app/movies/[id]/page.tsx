import { Metadata } from 'next';
import { getMovieById } from '@/lib/api';
import MovieDetailContent from '@/app/components/MovieDetailContent';

type MovieDetailPageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  // Optionally generate static paths for some popular movies
  const popularMovieIds = ['tt0111161', 'tt0068646', 'tt0167260'];
  return popularMovieIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  try {
    const movie = await getMovieById(params.id);
    return {
      title: `${movie.Title} (${movie.Year}) - Movie Details`,
      description: `Movie details for ${movie.Title}, directed by ${movie.Director}`,
    };
  } catch (error) {
    // Ensure error.message is used if available, otherwise use a fallback
    const errorMessage = error instanceof Error ? error.message : 'Movie not found';
    return {
      title: 'Movie Not Found',
      description: errorMessage,
    };
  }
}

export const revalidate = 86400; // Revalidate daily

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = await getMovieById(params.id);

  return <MovieDetailContent movie={movie} />;
}
