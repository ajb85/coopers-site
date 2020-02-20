import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from '../Login/';

export default function PublicRoutes(props) {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/gallery" />
      </Route>
      <Route path="/gallery">
        <div>Hello World</div>
      </Route>
      <Route exact path="/ajb85/">
        <Redirect to="/" />
      </Route>
      <Route exact path="/ajb85/login">
        <Login />
      </Route>
    </>
  );
}
