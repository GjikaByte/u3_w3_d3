import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // salvo nomi azienda (string) per semplicità
  companies: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite(state, { payload }) {
      const name = payload?.trim();
      if (name && !state.companies.includes(name)) state.companies.push(name);
    },
    removeFavourite(state, { payload }) {
      state.companies = state.companies.filter(c => c !== payload);
    },
    toggleFavourite(state, { payload }) {
      const name = payload?.trim();
      if (!name) return;
      const i = state.companies.indexOf(name);
      if (i === -1) state.companies.push(name);
      else state.companies.splice(i, 1);
    }
  }
});

export const { addFavourite, removeFavourite, toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;

// selectors
export const selectFavourites = (state) => state.favourites.companies;
export const isFavourite = (state, company) => state.favourites.companies.includes(company);
