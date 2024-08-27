import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { TMDB_API_KEY } from '../../config.js';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchTrendingMovies();
  }, []);

  return <MovieList movies={movies} />;
};

export default HomePage;
