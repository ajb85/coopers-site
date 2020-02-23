import React, { useState, useEffect, useContext } from 'react';

import { ImagesContext } from 'Providers/Images.js';

import styles from './styles.module.scss';

function MainImage({ image, showMenuState }) {
  const { nextImage, prevImage } = useContext(ImagesContext);

  const [showMenu] = showMenuState;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeWindow = () => {
      const offset = showMenu
        ? window.innerWidth * 0.2 <= 300
          ? 300
          : window.innerWidth * 0.2
        : 0;
      setWindowSize({
        width: Math.round(window.innerWidth - offset),
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const ratio = dimensions.width / dimensions.height;
      const proposedHeight = windowSize.width / ratio;

      setImageSize(
        proposedHeight >= windowSize.height
          ? { width: windowSize.height * ratio, height: windowSize.height }
          : { width: windowSize.width, height: proposedHeight }
      );
    }
  }, [dimensions, windowSize]);

  if (!image) {
    return <p>Loading...</p>;
  }

  const loadDimensions = ({ target }) => {
    if (dimensions.width === 0 && dimensions.height === 0) {
      setDimensions({ width: target.offsetWidth, height: target.offsetHeight });
    }
  };

  return (
    <div className={styles.MainImage}>
      <img
        style={dimensions.width && dimensions.height ? imageSize : null}
        onLoad={e => loadDimensions(e)}
        src={image.src}
        alt={image.alt}
      />
      <div className={styles.controls}>
        <p onClick={prevImage}>{'<'}</p>
        <p onClick={nextImage}>{'>'}</p>
      </div>
    </div>
  );
}

export default MainImage;
