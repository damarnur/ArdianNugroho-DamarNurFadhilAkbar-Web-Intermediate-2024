import { Metadata } from 'next';
import { getAllMovies } from '@/lib/api';
import { Movie } from '@/types/movie';
import FeaturedMoviesSection from '@/app/components/FeaturedMovieSection';
import ThemeWrapper from '@/context/theme-wrapper';

export const metadata: Metadata = {
  title: 'Movie Explorer - Discover Your Next Favorite Film',
  description:
    'Explore a world of cinematic adventures. Browse, discover, and dive into amazing films from every genre.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  let featuredMovies: Movie[] = [];

  try {
    const { movies } = await getAllMovies(1);
    featuredMovies = movies.slice(0, 6);
  } catch (error) {
    console.error('Failed to fetch featured movies', error);
  }

  return (
    <ThemeWrapper>
      <div>
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore a world of cinematic adventures. Browse, discover, and dive into
            amazing films from every genre.
          </p>
        </div>

        {/* Featured Movies Section */}
        <FeaturedMoviesSection initialMovies={featuredMovies} />

        {/* Decorative Element */}
        <div className="w-full h-1 bg-gray-200" />
      </div>
    </ThemeWrapper>
  );
}
