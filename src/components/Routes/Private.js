import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Manage from '../protected/Manage/';

import { AccountContext } from 'Providers/Account.js';

export default function PrivateRoutes(props) {
  const { token: tokenState } = useContext(AccountContext);
  const { token, verified } = tokenState;
  return (
    <>
      {token && verified ? (
        <>
          <Route path='/ajb85/manage'>
            <Manage />
          </Route>
        </>
      ) : token && !verified ? (
        <div>Verifying Account...</div>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
}
