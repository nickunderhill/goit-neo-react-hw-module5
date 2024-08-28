import axios from "axios";
import { TMDB_API_KEY } from './config';

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
    const response = await axios.get(
        '/trending/movie/day',
        {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        }
    );
    return response.data.results;
}

export const fetchDetails = async movieId => {
    const response = await axios.get(`/movie/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        }
    );
    return response.data;
};

export const search = async query => {
    const response = await axios.get(
        `/search/movie`,
        {
            params: { query },
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        }
    );
    return response.data.results;
}