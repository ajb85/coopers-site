import React from 'react';

import headerIMG from 'assets/header.jpg';
import styles from './styles.module.scss';

export default function Header(props) {
  return (
    <div>
      <img src={headerIMG} />
    </div>
  );
}
