import React from 'react';

import WindowImage from '../UI/WindowImage';

import styles from './styles.module.scss';

export default function FullImage(props) {
  return (
    <div className={styles.FullImage}>
      <WindowImage
        windowStyles={{ position: 'absolute', zIndex: -1 }}
        src={}
        alt="Header of Cooper"
      />
    </div>
  );
}
