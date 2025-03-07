import { favoritesApi } from '../api/services/favorites';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { CountryFavorite } from '../types/favorite';
import { useAppSelector } from '../store/hooks';
import { selectAllCountries } from '../store/slices/countriesSlice';
import { Spinner } from './Spinner';
import { Error } from './Error';
import CountryCard from './CountryCard';

const Favorites = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
    const allCountries = useAppSelector(selectAllCountries);

    useEffect(() => {
        if (!user) return;
        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await favoritesApi.getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites: ', error);
                setError('Failed to load favorites. Please try again later');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

    const convertToCountry = (favorite: CountryFavorite) => {
        const fullCountry = allCountries.find(
            (c) => c.name.common === favorite.country_name
        );

        if (fullCountry) return fullCountry;

        return {
            name: {
                common: favorite.country_name,
                official: favorite.country_name,
                nativaName: favorite.country_name,
            },
            cca3: favorite.country_code,
            flags: {
                png: favorite.country_flag,
                svg: favorite.country_flag,
            },
            region: 'Favorite',
            subregion: 'Favorite',
            population: 0,
            capital: ['Favorite'],
            currencies: {
                FAV: {
                    name: 'Favorite currency',
                    symbol: 'FAV',
                },
            },
            languages: {
                FAV: 'fav',
            },
            latlng: [0, 0] as [number, number],
        };
    };

    if (!user) return <div>Please login to view your favorites</div>;
    if (loading) return <Spinner />;
    if (error) return <Error error={error} />;

    return (
        <div className='favorites-container pt-10'>
            <h1 className='text-3xl w-fit dark:text-slate-200'>Favorites</h1>
            <div
                id='favorites-content-container'
                className='dark:text-slate-200 flex flex-wrap gap-4  w-fit mx-auto justify-center'
            >
                {favorites.length === 0 ? (
                    <p>You have not saved any countries to favorites</p>
                ) : (
                    favorites.map((favorite) => (
                        <CountryCard
                            key={favorite.country_code}
                            country={convertToCountry(favorite)}
                        />
                    ))
                )}

                {error && <Error error={error} />}
            </div>
        </div>
    );
};

export default Favorites;
