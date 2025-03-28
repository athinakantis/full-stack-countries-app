import { Country } from '../../types/country';
import { api } from '../axios';

export const countriesApi = {
    getAllCountries: (): Promise<Country[]> =>
        api.get('/all?fields=name,population,capital,region,flags,cca3',
            {headers: {'Access-Control-Allow-Origin': '*'}}

        ),
    getOneCountry: (name: string): Promise<Country[]> =>
        api.get(
            `/name/${name}?fields=name,population,capital,region,tld,subregion,currencies,languages,borders,cca3,flags,latlng`, 
            {headers: {'Access-Control-Allow-Origin': '*'}}
        ),
    getRegionalCountries: (region: string): Promise<Country[]> => api.get(`/region/${region}`)
};
