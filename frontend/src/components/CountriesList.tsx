import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchAllCountries,
    fetchRegionalCountries,
    filterCountriesBySearch,
    selectAllCountries,
    selectCountriesError,
    selectCountriesLoading,
    selectRegionalCountries,
    selectSearchedCountries,
} from '../store/slices/countriesSlice';
import { Country } from '../types/country';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Spinner } from './Spinner';

export const CountriesList = () => {
    const { filter, search } = useSearch()
    const [displayedCountries, setDisplayedCountries] = useState<Country[]>([])
    const dispatch = useAppDispatch();
    const allCountries = useAppSelector(selectAllCountries);
    const regionalCountries = useAppSelector(selectRegionalCountries)
    const searchedCountries = useAppSelector(selectSearchedCountries)
    const loading = useAppSelector(selectCountriesLoading)
    const error = useAppSelector(selectCountriesError)

    useEffect(() => {
        dispatch(fetchAllCountries());
        if (search) {
            dispatch(filterCountriesBySearch(search))
            setDisplayedCountries(searchedCountries)
        } else if (filter) {
            console.log('There is a filter')
            dispatch(fetchRegionalCountries(filter))
            setDisplayedCountries(regionalCountries)
        } else {
            setDisplayedCountries(allCountries)
        }
    }, [filter, search]);

    if (loading) return <Spinner />
    if (error) return (
        <div className='w-80 mx-auto p-6 text-slate-800 dark:text-slate-200'>Something went wrong!</div>
    )

    return (
        <>
            <div id='countries-container' className='flex flex-wrap gap-4 justify-center pt-10 '>
                {displayedCountries.length > 0 &&
                    displayedCountries.map((country: Country) => (
                        <Link className='h-fit' key={country.cca3} to={country.name.common}>
                            <div key={country.cca3} className='country-card rounded-sm overflow-hidden transition-shadow hover:shadow-lg bg-white dark:text-slate-200 dark:bg-slate-800'>
                                <img
                                    src={country.flags.png}
                                    alt={country.flags.alt}
                                />
                                <div className='p-3'>
                                    <p className='text-lg font-semibold'>{country.name.common}</p>
                                    <p><span className='font-medium'>Population:</span> {country.population!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
};
