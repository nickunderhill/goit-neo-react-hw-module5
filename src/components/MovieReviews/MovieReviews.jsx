import css from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TMDB_API_KEY } from '/src/config.js';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setReviews(response.data.results);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <ul className={css.reviews}>
          {reviews.map(review => (
            <li className={css.review} key={review.id}>
              <h3 className={css.author}>{review.author}</h3>
              <p className={css.reviewDate}>{review.created_at.slice(0, 10)}</p>
              <p className={css.comment}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
