import React, { useState, useEffect, useContext } from 'react';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';

import { ImagesContext } from 'Providers/Images.js';

import styles from './styles.module.scss';

function Gallery(props) {
  const { images } = useContext(ImagesContext);

  useEffect(() => {
    if (!activeImageState[0]) {
      const ids = Object.keys(images);
      if (ids.length) {
        const lastID = Math.max(...ids);
        activeImageState[1](lastID);
      }
    }
  }, [images]);

  const activeImageState = useState();
  return (
    <div className={styles.Gallery}>
      <MainImage
        image={activeImageState[0] ? images[activeImageState[0]] : {}}
      />
      <SideMenu activeImageState={activeImageState} images={images} />
    </div>
  );
}

export default Gallery;
