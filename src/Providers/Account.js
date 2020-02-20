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
    if (token) {
      // make API call to verify token}
      setToken({ token: 'asdf', verified: true });
    }

    // make call to verify token
  };
  return { token, setToken, updateToken };
}
