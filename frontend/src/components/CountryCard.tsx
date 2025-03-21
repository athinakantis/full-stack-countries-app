import { Link } from 'react-router-dom';
import { Country } from '../types/country';
import { formatPopulation } from '../utils/formatCountryData';
import FavoriteButton from './FavoriteButton';

const CountryCard = ({ country }: { country: Country }) => {
    const { name, flags, population, cca3 } = country

    return (
        <div
            key={cca3}
            className='country-card rounded-sm overflow-hidden transition-shadow hover:shadow-lg bg-white dark:text-slate-200 dark:bg-slate-800 h-fit transition-all relative'
        >
            <Link to={`/countries/${name.common}`}>
                <img
                    className='box-border border-b-1 border-opacity-10 border-slate-200 dark:border-b-0'
                    width={320}
                    src={flags.png}
                    alt={flags.alt}
                />
                <div className='p-3 flex justify-between'>
                    <div>

                    <p className='text-lg font-semibold'>
                        {name.common}
                    </p>
                    {population > 0 && <p>
                        <span className='font-medium'>Population: </span>
                        {formatPopulation(population)}
                    </p>}
                    </div>
                                <FavoriteButton country={country} />

                </div>
            </Link>
        </div>
    );
};

export default CountryCard;
