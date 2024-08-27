import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      {movies.length === 0 ? (
        <p className={css.notFoundPlaceholder}>Nothing found</p>
      ) : (
        <ul className={css.moviesList}>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                className={css.movieLink}
                to={`/movies/${movie.id}`}
                state={{ from: location, searchQuery: location.search }}
              >
                {movie.title}{' '}
                {movie.release_date
                  ? `(${movie.release_date.slice(0, 4)})`
                  : ''}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
