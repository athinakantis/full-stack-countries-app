import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Key change: Return response.data directly
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
