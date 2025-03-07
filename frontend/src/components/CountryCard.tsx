import { Link } from 'react-router-dom';
import { Country } from '../types/country';
import { formatPopulation } from '../utils/formatCountryData';
import FavoriteButton from './FavoriteButton';

const CountryCard = ({ country }: { country: Country }) => {

    return (
        <div
            key={country.cca3}
            className='country-card rounded-sm overflow-hidden transition-shadow hover:shadow-lg bg-white dark:text-slate-200 dark:bg-slate-800 h-fit transition-all relative'
        >
            <FavoriteButton country={country} />
            <Link to={country.name.common}>
                <img
                    width={320}
                    src={country.flags.png}
                    alt={country.flags.alt}
                />
                <div className='p-3'>
                    <p className='text-lg font-semibold'>
                        {country.name.common}
                    </p>
                    <p>
                        <span className='font-medium'>Population: </span>
                        {formatPopulation(country.population)}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default CountryCard;
