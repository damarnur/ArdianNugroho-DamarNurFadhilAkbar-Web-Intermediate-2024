import axios from 'axios';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail extends Movie {
  Plot: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<{ Search: Movie[]; totalResults: string }> => {
  try {
    const response = await axios.get(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  try {
    const response = await axios.get(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
