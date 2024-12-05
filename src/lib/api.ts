import axios from 'axios';
import { MovieDetail } from '@/types/movie';

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
