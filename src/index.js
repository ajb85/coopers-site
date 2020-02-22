import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './components/Routes/';

// Context
import Providers from './Providers/';

// Routing
import { Router } from 'react-router-dom';
import history from './history.js';

import 'SCSS/index.scss';

ReactDOM.render(
  <Providers>
    <Router history={history}>
      <Routes />
    </Router>
  </Providers>,
  document.getElementById('root')
);
