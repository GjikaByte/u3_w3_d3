import { combineReducers } from 'redux';
import favourites from './favouritesReducer.js';
import jobs from './jobsReducer.js';

export default combineReducers({
  favourites, // state.favourites
  jobs,       // state.jobs
});
