import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TMDB_API_KEY } from '/src/config.js';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setCast(response.data.cast);
    };
    fetchCast();
  }, [movieId]);

  const placeholderImage = 'https://via.placeholder.com/500x750?text=No+Photo';

  return (
    <div>
      {cast.length === 0 ? (
        <p>No information</p>
      ) : (
        <ul className={css.cast}>
          {cast.map(actor => (
            <li key={actor.cast_id} className={css.imageCard}>
              <img
                className={css.imageCardImg}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : placeholderImage
                }
              />
              <div className={css.actorName}>{actor.name}</div>
              <div className={css.characterName}>{actor.character}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
