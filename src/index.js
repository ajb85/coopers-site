import React from 'react';
import ReactDOM from 'react-dom';

import PublicRoutes from './components/Routes/Public.js';
import PrivateRoutes from './components/Routes/Private.js';

// Context
import Providers from './Providers/';

// Routing
import { Router } from 'react-router-dom';
import history from './history.js';

import 'SCSS/index.scss';

ReactDOM.render(
  <Providers>
    <Router history={history}>
      <PublicRoutes />
      <PrivateRoutes />
    </Router>
  </Providers>,
  document.getElementById('root')
);
