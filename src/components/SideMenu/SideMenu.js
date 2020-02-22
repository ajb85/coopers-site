import React from 'react';

import logo from '../../assets/logo.png';
import styles from './styles.module.scss';

function SideMenu(props) {
  return (
    <div className={styles.SideMenu}>
      <div className={styles.logo}>
        <img src={logo} alt="Cooper Logo" />
      </div>
    </div>
  );
}

export default SideMenu;
