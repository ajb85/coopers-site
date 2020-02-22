import React from 'react';

import styles from './styles.module.scss';

function MainImage({ image }) {
  if (!image) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.MainImage}>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}

export default MainImage;
