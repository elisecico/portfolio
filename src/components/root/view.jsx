import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { store, history } from '../../store';

import App from '../app';
import Dashboard from '../dashboard';
import Pokedex from '../pokedex';

function Root() {
  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="pokedex" component={Pokedex} />
          </Route>
        </Router>
      </div>
    </Provider>
  );
}

export default Root;
