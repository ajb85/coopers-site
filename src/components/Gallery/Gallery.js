import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';
import BottomMenu from '../BottomMenu/';

import { ImagesContext } from 'Providers/Images.js';
import { WindowContext } from 'Providers/Window.js';

import history from 'history.js';
import styles from './styles.module.scss';

function Gallery(props) {
  const {
    image,
    nextImage,
    prevImage,
    active,
    setActive,
    setLastImage
  } = useContext(ImagesContext);
  const { windowSize, showMenu, setShowMenu } = useContext(WindowContext);

  const { id } = useParams;
  console.log('ID: ', id);
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

    if (!active) {
      id ? setActive(id) : setLastImage();
    }

    removeListener();
    window.addEventListener('keydown', keyPress);

    return removeListener;
  }, [nextImage, prevImage, active, setActive, id, setLastImage]);

  if (!image) {
    return <div>Loading...</div>;
  }

  if (active) {
    history.push('/gallery/' + active);
  }

  return (
    <div className={styles.Gallery}>
      {active && (
        <MainImage
          windowSize={windowSize}
          image={image}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
      {windowSize.isMobile ? <BottomMenu /> : <SideMenu />}
    </div>
  );
}

export default Gallery;
