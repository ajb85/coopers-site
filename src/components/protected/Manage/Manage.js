import React from 'react';

import Upload from '../Upload/';
import Display from '../Display/';

import styles from './styles.module.scss';

export default function Manage(prop) {
  const [tab, setTab] = React.useState('upload');

  const selection = {
    upload: <Upload />,
    display: <Display />
  };
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
