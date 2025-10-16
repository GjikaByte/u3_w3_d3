import { FAV_ADD, FAV_REMOVE, FAV_TOGGLE } from './actionTypes.js';

export const addFavourite = (companyName) => ({
  type: FAV_ADD,
  payload: companyName,
});

export const removeFavourite = (companyName) => ({
  type: FAV_REMOVE,
  payload: companyName,
});

export const toggleFavourite = (companyName) => ({
  type: FAV_TOGGLE,
  payload: companyName,
});
