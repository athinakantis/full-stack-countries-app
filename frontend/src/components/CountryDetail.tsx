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
        <section id='single-country-container'>
            {country && (
                <>
                    <div className='single-country'>
                        <img src={country.flags.png} alt='' />
                        <h1>{country.name.common}</h1>
                        <p>{country.capital.join(', ')}</p>
                        <p>{country.region}</p>
                        <p>{country.subregion}</p>
                    </div>
                    <WeatherInfo city={country.capital[0]} />
                </>
            )}
        </section>
    );
};
