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
                setError(`Weather report currently not available.`)
            } finally {
                setLoading(false)
            }
        }
        updateWeather()
    }, [city]);

    return (
        <div data-testid='weather' className='bg-white flex flex-col shadow-md px-6 py-8 h-fit w-11/12 w-full rounded-sm min-h-40 dark:bg-slate-800 dark:text-slate-200'>
            {error && <p className='m-auto max-w-60 text-center'>{error}</p>}
            {loading && <p>Loading weather...</p>}
            {weather && (
                <>
                    <h3 className='text-2xl text-center '>Weather report</h3>
                    <img
                        className='self-center'
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt=''
                    />
                    <p className='pb-1 mb-1 border-b-1 flex justify-between border-slate-300 dark:border-slate-600'><span className='font-bold font-lato'>Current temperature: </span>{weather?.main.temp}°C</p>
                    <p className='pb-1 mb-1 border-b-1 flex justify-between border-slate-300 dark:border-slate-600'><span className='font-bold font-lato'>Temp feels like: </span>{weather?.main.feels_like}°C</p>
                    <p className='pb-1 mb-1 border-b-1 flex justify-between border-slate-300 dark:border-slate-600'><span className='font-bold font-lato'>Wind speed</span> {weather?.wind.speed} m/s</p>
                    <p className='pb-1 mb-1 border-b-1 flex justify-between border-slate-300 dark:border-slate-600'><span className='font-bold font-lato'>Humidity</span> {weather?.main.humidity ? `${weather?.main.humidity}%` : 'N/A'}</p>
                </>
            )

            }
        </div>
    );
};

