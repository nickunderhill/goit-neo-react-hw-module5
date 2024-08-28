import css from './MoviesPage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { search } from '../../api-tmdb.js';
import MovieList from '../../components/MovieList/MovieList.jsx';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const [emptyResult, setEmptyResult] = useState(false);

  const searchMovies = async query => {
    const movies = await search(query);
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
    setSearchParams({ query: inputValue });
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
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
