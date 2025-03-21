import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Country } from '../types/country';
import { useTheme } from '../theme/useTheme';
import { useEffect, useState } from 'react';
import { favoritesApi } from '../api/services/favorites';
import { Tooltip } from '@mui/material';

interface FavoriteButtonProps {
    country: Country;
    onToggle?: (isFavorite: boolean) => void;
}

const FavoriteButton = ({ country, onToggle }: FavoriteButtonProps) => {
    const { user } = useAuth();
    const { currentTheme } = useTheme();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!user || isInitialized) return;

        const checkFavoriteStatus = async () => {
            try {
                setLoading(true);
                const status = await favoritesApi.isFavorite(
                    country.name.common
                );
                setIsFavorite(status);
                setIsInitialized(true);
            } catch (error) {
                console.error('Error checking favorites status: ', error);
            }
        };

        checkFavoriteStatus();
    }, [user, country.name.common, isInitialized]);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) return;

        try {
            setLoading(true);
            if (isFavorite) {
                favoritesApi.removeFavorite(country.name.common);
                setIsFavorite(false);
            } else {
                favoritesApi.addFavorite(country);
                setIsFavorite(true);
            }

            if (onToggle) {
                onToggle(!isFavorite);
            }
        } catch (error) {
            console.error('Error toggling favorite: ', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    if (user)
        return (
            <Tooltip
                title={
                    isFavorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                }
            >
                <button
                    data-test-id='favorite-button'
                    className='favorite-button hover:cursor-pointer p-1 rounded-full z-10'
                    onClick={handleToggleFavorite}
                >
                    <Heart
                        fill={isFavorite && currentTheme === 'dark' ? 'oklch(0.882 0.059 254.128)' 
                            : isFavorite && currentTheme === 'light' ? 'oklch(0.585 0.233 277.117)' 
                            : 'transparent'}
                        color={currentTheme === 'dark' ? 'oklch(0.882 0.059 254.128)' : 'oklch(0.585 0.233 277.117)'}
                    />
                </button>
            </Tooltip>
        );
};

export default FavoriteButton;
