import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CountryState } from '../../types/country';
import { countriesApi } from '../../api/services/countries';
import { RootState } from '../store';

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
    regionalCountries: [],
    filteredCountries: []
};

export const fetchAllCountries = createAsyncThunk(
    'countries/fetchAllCountries',
    async () => {
        const response = await countriesApi.getAllCountries();
        return response;
    }
);

export const fetchOneCountry = createAsyncThunk(
    'countries/fetchOneCountry',
    async (code: string) => {
        const response = await countriesApi.getOneCountry(code);
        return response;
    }
);

export const fetchRegionalCountries = createAsyncThunk(
    'countries/fetchRegionalCountries',
    async (region: string) => {
        const response = await countriesApi.getRegionalCountries(region)
        return response;
    }
)

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        },
        filterCountriesBySearch: (state, action) => {
            console.log(action.payload)
            const searchterm = action.payload;
            console.log(searchterm)
            state.filteredCountries = (state.regionalCountries || state.countries).filter(country => country.name.common.toLowerCase().includes(searchterm))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.countries = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.error =
                (action.payload as string) || 'Failed to fetch countries';
        });
        builder.addCase(fetchOneCountry.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOneCountry.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedCountry = action.payload[0];
        });
        builder.addCase(fetchOneCountry.rejected, (state, action) => {
            state.loading = false;
            state.error =
                (action.payload as string) || 'Failed to fetch country';
        });
        builder.addCase(fetchRegionalCountries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRegionalCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.regionalCountries = action.payload;
        });
        builder.addCase(fetchRegionalCountries.rejected, (state, action) => {
            state.loading = false;
            state.error =
                (action.payload as string) || 'Failed to fetch countries';
        });
    },
});

export const selectAllCountries = (state: RootState) =>
    state.countries.countries;

export const selectOneCountry = (state: RootState) =>
    state.countries.selectedCountry;

export const selectCountriesError = (state: RootState) => state.countries.error;
export const selectCountriesLoading = (state: RootState) =>
    state.countries.loading;

export const selectRegionalCountries = (state: RootState) => state.countries.regionalCountries
export const selectSearchedCountries = (state: RootState) => state.countries.filteredCountries

export const { clearSelectedCountry, filterCountriesBySearch } = countriesSlice.actions;
export default countriesSlice.reducer;
