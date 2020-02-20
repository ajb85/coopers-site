import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

function Login(props) {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = e => {
    e.preventDefault();

    // Make API call to login
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
