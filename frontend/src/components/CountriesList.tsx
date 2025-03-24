import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    resetTotalPages,
    fetchAllCountries,
    fetchRegionalCountries,
    filterCountriesBySearch,
    selectAllCountries,
    selectCountriesError,
    selectCountriesLoading,
    selectRegionalCountries,
    selectSearchedCountries,
    selectTotalPages,
} from '../store/slices/countriesSlice';
import { Country } from '../types/country';
import { useSearch } from '../context/SearchContext';
import { Spinner } from './Spinner';
import { Error } from './Error';
import Pagination from '@mui/material/Pagination';
import CountryCard from './CountryCard';
import { CountryFavorite } from '../types/favorite';
import { favoritesApi } from '../api/services/favorites';

export const CountriesList = () => {
    const { filter, search } = useSearch();
    const [displayedCountries, setDisplayedCountries] = useState<Country[]>([]);
    const dispatch = useAppDispatch();
    const allCountries = useAppSelector(selectAllCountries);
    const regionalCountries = useAppSelector(selectRegionalCountries);
    const searchedCountries = useAppSelector(selectSearchedCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);
    const [page, setPage] = useState(1);
    const totalPages = useAppSelector(selectTotalPages);
    const [favorites, setFavorites] = useState<CountryFavorite[]>([])

    /*
    When search or filter updates, dispatch actions
    */
    useEffect(() => {
        async function updateDisplayedCountries() {
            if (allCountries.length < 1) dispatch(fetchAllCountries());
            setPage(1);
            if (search) {
                if (filter) {
                    await dispatch(fetchRegionalCountries(filter));
                }
                dispatch(filterCountriesBySearch({ search, filter }));
            } else if (filter) {
                await dispatch(fetchRegionalCountries(filter));
            } else if (!filter && !search) dispatch(resetTotalPages());
        }
        updateDisplayedCountries();
    }, [filter, search]);

    /*
    Fetch favorites on mount
    */
    useEffect(() => {
        favoritesApi.getFavorites().then(favs => {
            setFavorites(favs)
        })
    }, [])

    function pageinateCountries(array: Country[], pageSize = 10) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return array.slice(startIndex, endIndex);
    }

    const handlePaginate = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (search) setDisplayedCountries(pageinateCountries(searchedCountries));
        if (filter && !search) {
            setDisplayedCountries(pageinateCountries(regionalCountries));
        }
        if (!filter && !search) {
            setDisplayedCountries(pageinateCountries(allCountries));
        }
    }, [
        allCountries,
        regionalCountries,
        searchedCountries,
        search,
        filter,
        page,
    ]);

    if (loading) return <Spinner />;
    if (error) return <Error error={error} />;

    return (
        <>
            <div
                id='countries-container'
                className='flex flex-wrap gap-4 justify-center pt-10'
            >
                {displayedCountries.length > 0 ? (
                    displayedCountries.map((country: Country) => (
                        <CountryCard
                            key={country.cca3}
                            country={country}
                            favoriteState={favorites.map(favorite => favorite.country_name).includes(country.name.common)}
                        />
                    ))
                ) : (
                    <p className='dark:text-slate-200 text-xl mt-50'>No countries found</p>
                )}
                {totalPages > 1 && (
                    <Pagination
                        className='w-full my-6 justify-self-center [&>ul]:justify-self-center [&>ul>li>button]:dark-bg-slate-200 justify-self-end h-fit mt-auto align-self-end'
                        count={totalPages}
                        color='primary'
                        page={page}
                        onChange={handlePaginate}
                    />
                )}
            </div>
        </>
    );
};
