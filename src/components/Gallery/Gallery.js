import React, { useState, useContext } from 'react';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';

import { ImagesContext } from 'Providers/Images.js';

import styles from './styles.module.scss';

function Gallery(props) {
  const { image } = useContext(ImagesContext);
  const showMenuState = useState(true);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Gallery}>
      <MainImage image={image} showMenuState={showMenuState} />
      <SideMenu active={image.id} showMenuState={showMenuState} />
    </div>
  );
}

export default Gallery;
