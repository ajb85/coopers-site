import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Upload from '../Upload/';
import Display from '../Display/';

import { AccountContext } from 'Providers/Account.js';

import styles from './styles.module.scss';

export default function Manage(prop) {
  const { tokenStatus } = useContext(AccountContext);
  const { token, verified } = tokenStatus;
  const [tab, setTab] = useState('upload');

  const selection = {
    upload: <Upload />,
    display: <Display />
  };

  if (token && !verified) {
    return <div>Verifying token...</div>;
  } else if (!token) {
    return <Redirect to='/' />;
  }

  return (
    <div className={styles.Manage}>
      <nav>
        <p
          style={{ backgroundColor: tab === 'upload' ? 'darkgrey' : null }}
          onClick={() => (tab !== 'upload' ? setTab('upload') : null)}
        >
          Upload
        </p>
        <p
          style={{ backgroundColor: tab === 'display' ? 'darkgrey' : null }}
          onClick={() => (tab !== 'display' ? setTab('display') : null)}
        >
          Manage
        </p>
      </nav>

      {selection[tab]}
    </div>
  );
}
