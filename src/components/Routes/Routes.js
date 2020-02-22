import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from '../Login';
import Manage from '../protected/Manage';
import Gallery from '../Gallery/';

import { AccountContext } from 'Providers/Account.js';

export default function Routes(props) {
  const { tokenStatus } = useContext(AccountContext);
  const { token, verified } = tokenStatus;
  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/">
        <Redirect to="/gallery" />
      </Route>
      <Route exact path="/gallery">
        <Gallery />
      </Route>
      <Route exact path="/ajb85/login">
        <Login />
      </Route>

      {/* Private Routes */}
      {token && verified ? (
        <>
          <Route exact path="/ajb85/manage">
            <Manage />
          </Route>
        </>
      ) : token && !verified ? (
        <>
          <div>Verifying Account...</div>
        </>
      ) : (
        <Redirect to="/" />
      )}

      {/* Default Route */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
