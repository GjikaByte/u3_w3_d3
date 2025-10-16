import { FAV_ADD, FAV_REMOVE, FAV_TOGGLE } from '../actions/actionTypes.js';

const initial = { companies: [] };

export default function favouritesReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD: {
      const name = (action.payload || '').trim();
      if (!name || state.companies.includes(name)) return state;
      return { ...state, companies: [...state.companies, name] };
    }
    case FAV_REMOVE:
      return { ...state, companies: state.companies.filter(c => c !== action.payload) };
    case FAV_TOGGLE: {
      const name = (action.payload || '').trim();
      if (!name) return state;
      return state.companies.includes(name)
        ? { ...state, companies: state.companies.filter(c => c !== name) }
        : { ...state, companies: [...state.companies, name] };
    }
    default:
      return state;
  }
}
