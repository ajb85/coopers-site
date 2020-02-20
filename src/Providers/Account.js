import React, { useState, createContext } from 'react';

export const AccountContext = createContext();

export function Account(props) {
  const tokenState = useToken();
  const { Provider } = AccountContext;

  return <Provider value={tokenState}>{props.children}</Provider>;
}

function useToken() {
  const [token, setToken] = useState({
    token: localStorage.getItem('token'),
    verified: false
  });

  const updateToken = () => {
    if (token && !token.verified) {
      // make API call to verify token}
      // HARD CODED
      setToken({ token: 'myToken', verified: true });
    }
  };

  const saveToken = token => {
    // HARD CODED
    localStorage.setItem('token', token);
    setToken({ token, verified: true });
  };

  updateToken();
  return { token, saveToken };
}
