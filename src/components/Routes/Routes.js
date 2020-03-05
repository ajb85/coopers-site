import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Account } from 'Providers/Account.js';
import Login from '../Login';
import Manage from '../protected/Manage';
import Gallery from '../Gallery/';

export default function Routes(props) {
  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/">
        <Redirect to="/gallery" />
      </Route>
      <Route exact path="/gallery">
        <Gallery />
      </Route>
      <Route exact path="/gallery/:id">
        <Gallery />
      </Route>
      <Route exact path="/ajb85/login">
        <Account>
          <Login />
        </Account>
      </Route>

      {/* Private Routes */}
      <Route exact path="/ajb85/manage">
        <Account>
          <Manage />
        </Account>
      </Route>

      {/* Default Route */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
