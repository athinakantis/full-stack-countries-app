import axios from 'axios';
import { CityWeather } from '../../types/weather';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
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

export const weatherApi = {
    getWeatherByCity: async (city: string): Promise<CityWeather> => {
        const response = await api.get(
            `/weather?q=${city}&units=metric&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
            }`
        );
        return response as unknown as CityWeather;
    },
};
