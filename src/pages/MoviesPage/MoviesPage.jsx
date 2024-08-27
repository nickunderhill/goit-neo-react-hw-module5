import css from './MoviesPage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { TMDB_API_KEY } from '/src/config.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [emptyResult, setEmptyResult] = useState(false);

  const searchMovies = async query => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );
    const movies = response.data.results;
    movies.length === 0 ? setEmptyResult(true) : setEmptyResult(false);
    setMovies(movies);
  };

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          value={query}
          onChange={e => setSearchParams({ query: e.target.value })}
          placeholder="Search movie"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      {emptyResult ? (
        <div className={css.emptyResult}>Nothing found</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
