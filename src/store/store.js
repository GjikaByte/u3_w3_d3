import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favouritesSlice.js';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});
