import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios.js';
import history from 'history.js';

import { AccountContext } from 'Providers/Account.js';
import styles from './styles.module.scss';

function Login(props) {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const { saveToken } = useContext(AccountContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (login.username.length && login.password.length) {
      axios
        .post('/login', login)
        .then(({ data }) => {
          saveToken(data.token);
          history.push('/ajb85/manage');
        })
        .catch(err => console.log('LOGIN ERROR: ', err));
    }
  };

  return (
    <form className={styles.login} onSubmit={e => handleSubmit(e)}>
      <Link to="/">Didn't mean to end up here? Click to go back!</Link>
      <input
        value={login.username}
        onChange={e => setLogin({ ...login, username: e.target.value })}
      />
      <input
        value={login.password}
        onChange={e => setLogin({ ...login, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
