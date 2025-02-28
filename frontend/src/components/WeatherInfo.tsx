import { useEffect, useState } from 'react';
import { CityWeather } from '../types/weather';
import { weatherApi } from '../api/services/weather';

export const WeatherInfo = ({ city }: { city: string }) => {
    const [weather, setWeather] = useState<CityWeather | null>(null);
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function updateWeather() {
            try {
                setLoading(true)
                const response = await weatherApi.getWeatherByCity(city.toLowerCase())
                setWeather(response)
            } catch (error) {
                setError(`Couldn't get local weather report`)
            } finally {
                setLoading(false)
            }
        }
        updateWeather()
    }, [city]);

    if (error) {
        return <div>{error}</div>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className='weatherInfo'>
            <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt=''
            />
            <p>
                Current temperature is {weather?.main.temp}°C but feels like{' '}
                {weather?.main.feels_like}°C
            </p>
            <p>Wind speed {weather?.wind.speed}</p>
            <p>Humidity {weather?.main.humitidy}</p>
        </div>
    );
};
