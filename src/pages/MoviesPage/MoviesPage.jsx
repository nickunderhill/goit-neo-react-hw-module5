import css from './MoviesPage.module.css';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { TMDB_API_KEY } from '/src/config.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const searchMovies = useCallback(async query => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );
    setMovies(response.data.results);
  }, []);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.state?.searchQuery).get(
      'query'
    );
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [location, query, searchMovies]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query });
    searchMovies(query);
  };

  return (
    <div>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movie"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
