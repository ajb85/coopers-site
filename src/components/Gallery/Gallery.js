import React, { useState, useEffect, useContext } from 'react';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';

import { ImagesContext } from 'Providers/Images.js';

import styles from './styles.module.scss';

function Gallery(props) {
  const { images } = useContext(ImagesContext);
  const activeImageState = useState(null);
  const [active] = activeImageState;
  const showMenuState = useState(true);

  useEffect(() => {
    if (activeImageState[0] === null && images.length) {
      activeImageState[1](images.lastID());
    }
  }, [activeImageState]);

  if (active === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.Gallery}>
      <MainImage image={images.get(active)} showMenuState={showMenuState} />
      <SideMenu
        activeImageState={activeImageState}
        showMenuState={showMenuState}
        images={images}
      />
    </div>
  );
}

export default Gallery;
