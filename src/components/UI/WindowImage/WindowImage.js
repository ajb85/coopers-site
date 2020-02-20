import React from 'react';

import styles from './styles.module.scss';

export default function WindowImage(props) {
  const { src, alt, windowStyles, imgStyles } = props;
  return (
    <div className={styles.window} style={windowStyles}>
      <img style={imgStyles} src={src} alt={alt} />
    </div>
  );
}
