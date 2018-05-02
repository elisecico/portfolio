/* ---------------- imports --------------------------------------------------------- */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import {
  nav,
} from '../modules';

/* ---------------- configure middlewares -------------------------------------------------- */

const middlewares = [
  thunk,
];

const middleware = applyMiddleware(...middlewares);

/* ---------------- configure store --------------------------------------------------------- */

const configureStore = (initialState) => {
  const rootReducer = combineReducers({
    routing: routerReducer,
    nav: nav.reducer,
  });
  const store = createStore(
    rootReducer,
    initialState,
    compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f),
  );
  return store;
};

const store = configureStore({});

/* ---------------- configure history --------------------------------------------------------- */

const history = syncHistoryWithStore(browserHistory, store);

/* ---------------- exports --------------------------------------------------------- */

module.exports = {
  store,
  history,
};
