// src/redux/store.js
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';   // ⬅️ named export
import rootReducer from './reducers/index.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
