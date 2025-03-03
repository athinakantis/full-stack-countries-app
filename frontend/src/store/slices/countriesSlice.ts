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
  filteredCountries: [],
  totalPages: 0
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
    const response = await countriesApi.getRegionalCountries(region);
    return response;
  }
);

const calculateTotalPages = (arrayLength: number, pageItems: number = 10) => {
    return Math.ceil(arrayLength / pageItems)
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
      state.error = null;
    },
    filterCountriesBySearch: (state, action) => {
      state.error = null;
      const { search, filter } = action.payload;
      console.log(search, filter);
      if (filter) {
        state.filteredCountries = state.regionalCountries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        state.filteredCountries = state.countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
      }
      state.totalPages = calculateTotalPages(state.filteredCountries.length)
    },
    clearSearch: (state) => {
      state.filteredCountries = [];
    },
    resetTotalPages: (state) => {
      state.totalPages = calculateTotalPages(state.countries.length)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.totalPages = calculateTotalPages(action.payload.length)
      state.loading = false;
    });
    builder.addCase(fetchAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Failed to fetch countries';
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
      state.error = (action.payload as string) || 'Failed to fetch country';
    });
    builder.addCase(fetchRegionalCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRegionalCountries.fulfilled, (state, action) => {
        state.totalPages = calculateTotalPages(action.payload.length)        
        state.regionalCountries = action.payload;
        state.loading = false;
    });
    builder.addCase(fetchRegionalCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch countries';
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

export const selectRegionalCountries = (state: RootState) =>
  state.countries.regionalCountries;
export const selectSearchedCountries = (state: RootState) =>
  state.countries.filteredCountries;

export const selectTotalPages = (state: RootState) => state.countries.totalPages;

export const {
  clearSelectedCountry,
  filterCountriesBySearch,
  resetTotalPages
} = countriesSlice.actions;
export default countriesSlice.reducer;
