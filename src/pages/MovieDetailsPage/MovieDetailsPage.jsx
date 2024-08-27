import css from './MovieDetailsPage.module.css';
import { useEffect, useState, useRef } from 'react';
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { TMDB_API_KEY } from '/src/config.js';
import { TiArrowBack } from 'react-icons/ti';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const locationState = useRef(location.state);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(locationState.current?.from ?? '/');
  };

  const placeholderImage = 'https://via.placeholder.com/500x750?text=No+Photo';

  return (
    <div className={css.details}>
      <button className={css.backBtn} onClick={handleGoBack}>
        <TiArrowBack /> back
      </button>
      <h1>{movie.title}</h1>
      <div className={css.movieCard}>
        <img
          className={css.movieCardPoster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : placeholderImage
          }
        />
        <div className={css.movieCardTextInfo}>
          <div className={css.infoSection}>
            <p className={css.infoTitle}>Overview:</p>
            <a className={css.infoDescription}>{movie.overview}</a>
          </div>
          <div className={css.infoSection}>
            <p className={css.infoTitle}>Rating:</p>
            <p className={css.infoDescription}>{movie.vote_average} / 10</p>
          </div>
          <div className={css.infoSection}>
            <p className={css.infoTitle}>Release date:</p>
            <p className={css.infoDescription}>{movie.release_date}</p>
          </div>
          <div className={css.infoSection}>
            <p className={css.infoTitle}>Genres:</p>
            <p className={css.infoDescription}>
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
      <nav>
        <ul className={css.detailsLinks}>
          <li className={css.detailsLinkItem}>
            <NavLink className={css.detailsLinkItemLink} to="cast">
              Cast
            </NavLink>
          </li>
          <li className={css.detailsLinkItem}>
            <NavLink className={css.detailsLinkItemLink} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
