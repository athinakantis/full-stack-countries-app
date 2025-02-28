import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchAllCountries,
    selectAllCountries,
} from '../store/slices/countriesSlice';
import { Country } from '../types/country';
import { Link } from 'react-router-dom';

export const CountriesList = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);

    useEffect(() => {
        dispatch(fetchAllCountries());
    }, []);

    return (
        <div id='countries-container'>
            {countries.length > 0 &&
                countries.map((country: Country) => (
                    <Link key={country.cca3} to={country.name.common}>
                        <div className='country-card'>
                            <img
                                src={country.flags.png}
                                alt={country.flags.alt}
                            />
                            {country.name.common}
                        </div>
                    </Link>
                ))}
        </div>
    );
};
