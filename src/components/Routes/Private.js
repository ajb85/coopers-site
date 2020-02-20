import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoutes(props) {
  return (
    <>
      {token ? (
        <Redirect to="/" />
      ) : (
        <>
          <Route path="/gallery">
            <div>Hello World</div>
          </Route>
        </>
      )}
    </>
  );
}
