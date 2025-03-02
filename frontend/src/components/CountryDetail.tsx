import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchOneCountry,
    selectCountriesError,
    selectCountriesLoading,
    selectOneCountry,
} from '../store/slices/countriesSlice';
import { useParams } from 'react-router-dom';
import { WeatherInfo } from './WeatherInfo';

export const SingleCountry = () => {
    const { name } = useParams();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectOneCountry);
    const error = useAppSelector(selectCountriesError);
    const loading = useAppSelector(selectCountriesLoading);

    useEffect(() => {
        if (name) {
            dispatch(fetchOneCountry(name));
        }
    }, [name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Sorry, something went wrong!</div>;
    }

    return (
        <section id='single-country-container' className='flex gap-6 justify-center mx-auto pt-10 px-4 flex-wrap max-w-7xl'>
            {country && (
                <>
                    {/* <Link to='/countries' className='bg-blue-200 hover:bg-blue-300 h-fit px-5 py-2 radius-full transition-colors'>Back to countries</Link> */}
                    <div className='single-country p-6  max-w-md shadow-sm rounded-sm bg-white dark:bg-slate-800 dark:text-slate-200 flex-grow'>
                        <h1 className='text-3xl mb-4'>{country.name.common}</h1>

                        <div className="text-md">
                            <p className='mt-4'><span className='font-bold'>{country.capital.length > 1 ? 'Capitals: ' : 'Capital: '}</span>{country.capital.join(', ')}</p>
                            <p><span className='font-bold'>Region:</span> {country.region}</p>
                            <p><span className='font-bold'>Subregion:</span> {country.subregion}</p>
                            <p><span className='font-bold'>Languages: </span>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                        </div>
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
