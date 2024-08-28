import { useEffect, useState } from 'react';
import { fetchTrending } from '../../api-tmdb.js';
import MovieList from '../../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await fetchTrending();
      setMovies(movies);
    };
    fetchTrendingMovies();
  }, []);

  return <MovieList movies={movies} />;
};

export default HomePage;
