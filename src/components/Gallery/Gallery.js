import React, { useState, useEffect, useContext } from 'react';

import MainImage from '../MainImage/';
import SideMenu from '../SideMenu/';

import { ImagesContext } from 'Providers/Images.js';

import styles from './styles.module.scss';

function Gallery(props) {
  const { image, nextImage, prevImage, active } = useContext(ImagesContext);
  const showMenuState = useState(false);
  const [showMenu] = showMenuState;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - getWindowSize(showMenu).offset,
    height: window.innerHeight
  });

  useEffect(() => {
    setWindowSize(getWindowSize(showMenu));
  }, [showMenu]);

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

  useEffect(function() {
    const resizeWindow = () => {
      setWindowSize(getWindowSize(showMenu));
    };

    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
    // eslint-disable-next-line
  }, []);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Gallery}>
      <MainImage
        windowSize={windowSize}
        image={image}
        showMenuState={showMenuState}
      />
      <SideMenu windowSize={windowSize} showMenuState={showMenuState} />
    </div>
  );
}

export default Gallery;

function getWindowSize(showMenu) {
  const offset = showMenu
    ? window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 0;
  return {
    width: Math.round(window.innerWidth - offset),
    height: window.innerHeight,
    offset
  };
}
