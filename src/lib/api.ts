import axios from 'axios';
import { MovieDetail, Movie } from '@/types/movie';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await axios.get(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`,
  );

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie not found');
  }

  return response.data;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await axios.get(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}&page=${page}`,
  );

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'No movies found');
  }

  return response.data;
};

// New method to fetch all movies with sorting and filtering
export const getAllMovies = async (
  page: number = 1,
  sortBy: 'year' | 'title' = 'title',
  order: 'asc' | 'desc' = 'asc',
) => {
  try {
    // For this method, we'll use a default search with 's=a' to get movies starting with 'A'
    const response = await axios.get(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=a&page=${page}`,
    );

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No movies found');
    }

    const movies = response.data.Search || [];

    // Sort movies
    movies.sort((a: Movie, b: Movie) => {
      if (sortBy === 'year') {
        return order === 'asc'
          ? parseInt(a.Year) - parseInt(b.Year)
          : parseInt(b.Year) - parseInt(a.Year);
      } else {
        return order === 'asc'
          ? a.Title.localeCompare(b.Title)
          : b.Title.localeCompare(a.Title);
      }
    });

    return {
      movies,
      totalResults: parseInt(response.data.totalResults || '0'),
    };
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};
