import React, { useEffect, useContext } from 'react';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';
import BottomMenu from '../BottomMenu/';

import { ImagesContext } from 'Providers/Images.js';
import { WindowContext } from 'Providers/Window.js';

import styles from './styles.module.scss';

function Gallery(props) {
  const { image, nextImage, prevImage, active } = useContext(ImagesContext);
  const { windowSize, showMenu, setShowMenu } = useContext(WindowContext);

  useEffect(() => {
    const removeListener = () =>
      window.removeEventListener('keydown', keyPress);
    function keyPress({ code }) {
      if (code === 'ArrowLeft') {
        prevImage();
      } else if (code === 'ArrowRight') {
        nextImage();
      }
    }

    removeListener();
    window.addEventListener('keydown', keyPress);

    return removeListener;
  }, [nextImage, prevImage, active]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Gallery}>
      <MainImage
        windowSize={windowSize}
        image={image}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      {windowSize.isMobile ? <BottomMenu /> : <SideMenu />}
    </div>
  );
}

export default Gallery;
