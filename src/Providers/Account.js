import React, { useState, createContext } from 'react';
import axios from 'axios.js';

export const AccountContext = createContext();

export function Account(props) {
  const tokenState = useToken();
  const { Provider } = AccountContext;

  return <Provider value={tokenState}>{props.children}</Provider>;
}

function useToken() {
  const [tokenStatus, setToken] = useState({
    token: localStorage.getItem('token'),
    verified: false
  });

  const [verifyAttempted, setVerifyAttempted] = useState(false);

  const updateToken = () => {
    if (tokenStatus && !tokenStatus.verified && !verifyAttempted) {
      setVerifyAttempted(true);
      axios
        .get('/token/verify')
        .then(_ => setToken({ ...tokenStatus, verified: true }))
        .catch(_ => {
          localStorage.removeItem('token');
          setToken({ token: null, verified: false });
        });
    }
  };

  const saveToken = token => {
    if (token) {
      localStorage.setItem('token', token);
      setToken({ token, verified: true });
    }
  };

  updateToken();
  return { tokenStatus, saveToken };
}
