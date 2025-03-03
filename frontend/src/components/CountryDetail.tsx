import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchOneCountry,
    selectCountriesError,
    selectCountriesLoading,
    selectOneCountry,
} from '../store/slices/countriesSlice';
import { Link, useParams } from 'react-router-dom';
import { WeatherInfo } from './WeatherInfo';
import { APIProvider, ColorScheme, Map, Marker } from '@vis.gl/react-google-maps';
import { Spinner } from './Spinner';
import { useTheme } from '../theme/useTheme';
import { ArrowLeft } from 'lucide-react';

export const SingleCountry = () => {
    const { name } = useParams();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectOneCountry);
    const error = useAppSelector(selectCountriesError);
    const loading = useAppSelector(selectCountriesLoading);
    const { currentTheme } = useTheme()

    useEffect(() => {
        if (name) dispatch(fetchOneCountry(name));
    }, [name]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <div>Sorry, something went wrong!</div>;
    }

    return (
        <section id='single-country-container' className='flex gap-6 justify-center mx-auto pt-10 px-4 flex-wrap max-w-5xl *:max-w-full'>
            {country && (
                <>
                    <div className='max-w-xl flex flex-col max-w-full gap-3 flex-grow max-w-xl min-w-lg'>
                        <div className='w-full'>
                            <Link to='/countries' className='text-sm h-fit hover:bg-blue-200 p-1 radius-full dark:text-slate-200 transition-all hover:pr-2 hover:px-5 hover:pl-7 hover:py-1 rounded-full relative hover:[&>svg]:left-2 hover:[&>svg]:opacity-100 hover:dark:bg-indigo-700 ease-out'>
                                Back to countries

                                <ArrowLeft color={currentTheme === 'light' ? 'oklch(0.279 0.041 260.031)' : 'oklch(0.882 0.059 254.128)'} className='inline absolute left-6 top-1 opacity-0 transition-all delay-0 ease-out' size={15}
                                />

                            </Link>
                        </div>
                        <div className='single-country px-6 py-8 h-fit shadow-sm rounded-sm bg-white dark:bg-slate-800 dark:text-slate-200 mb-3'>
                            <h1 className='text-3xl mb-4'>{country.name.common}</h1>
                            <div className="text-md">
                                <p className='mt-4'><span className='font-bold'>{country.capital.length > 1 ? 'Capitals: ' : 'Capital: '}</span>{country.capital.join(', ')}</p>
                                <p><span className='font-bold'>Region:</span> {country.region}</p>
                                <p><span className='font-bold'>Subregion:</span> {country.subregion}</p>
                                <p><span className='font-bold'>Languages: </span>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                                <p><span className='font-bold'>Population: </span>{country
                                    .population.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                <p><span className='font-bold'>Currencies: </span>{ }</p>
                            </div>
                        </div>
                        {
                            country.latlng &&
                            <div className='h-80 shadow-sm rounded-sm overflow-hidden'>
                                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                                    <Map
                                        style={{ width: '100%', height: '100%' }}
                                        defaultCenter={{ lat: country.latlng[0], lng: country.latlng[1] }}
                                        defaultZoom={2}
                                        gestureHandling={'greedy'}
                                        colorScheme={currentTheme.toUpperCase() as ColorScheme}
                                        disableDefaultUI={true}>
                                        <Marker position={{ lat: country.latlng[0], lng: country.latlng[1] }} />

                                    </Map>
                                </APIProvider>
                            </div>
                        }
                    </div>
                    <div className='flex gap-8 flex-col max-w-md'>
                        <img src={country.flags.png} className='rounded-sm shadow-sm h-fit' alt='' />
                        <WeatherInfo city={country.capital[0]} />
                    </div>
                </>
            )}
        </section>
    );
};
