import { JOBS_REQUEST, JOBS_SUCCESS, JOBS_FAILURE } from '../actions/actionTypes.js';

const initial = {
  items: [],
  loading: false,
  error: null,
  lastQuery: '',
  lastCompany: '',
};

export default function jobsReducer(state = initial, action) {
  switch (action.type) {
    case JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        lastQuery: action.payload?.query || state.lastQuery,
        lastCompany: action.payload?.company || state.lastCompany,
      };
    case JOBS_SUCCESS:
      return { ...state, loading: false, items: action.payload.items, error: null };
    case JOBS_FAILURE:
      return { ...state, loading: false, error: action.payload.error || 'Errore' };
    default:
      return state;
  }
}
