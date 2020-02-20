import React from 'react';
import ReactDOM from 'react-dom';

import PublicRoutes from './components/Routes/Public.js';

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
    </Router>
  </Providers>,
  document.getElementById('root')
);
