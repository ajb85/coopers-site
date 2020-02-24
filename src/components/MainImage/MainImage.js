import React, { useState, useEffect, useContext } from 'react';

import { ImagesContext } from 'Providers/Images.js';
import getAge from 'js/getAge.js';

import Fade from 'styles/components/Fade/';
import styles from './styles.module.scss';

function MainImage({ showMenuState }) {
  const { nextImage, image, prevImage } = useContext(ImagesContext);
  const [transition, setTransition] = useState(false);
  const [renderedImage, setRenderedImage] = useState(image);
  const [showMenu] = showMenuState;
  const offset = showMenu
    ? window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 0;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - offset,
    height: window.innerHeight
  });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeWindow = () => {
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
    if (renderedImage.width && renderedImage.height) {
      const ratio = renderedImage.width / renderedImage.height;
      const proposedHeight = windowSize.width / ratio;

      setImageSize(
        proposedHeight >= windowSize.height
          ? { width: windowSize.height * ratio, height: windowSize.height }
          : { width: windowSize.width, height: proposedHeight }
      );
    }
  }, [windowSize, renderedImage]);

  useEffect(() => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
      setRenderedImage(image);
    }, 500);
    setTimeout(() => {
      setTransition(null);
    }, 1500);
  }, [image]);

  if (!image) {
    return <p>Loading...</p>;
  }

  return (
    <Fade direction={transition ? 'out' : transition === false ? 'in' : 'done'}>
      <img
        style={imageSize.width && imageSize.height ? imageSize : null}
        src={renderedImage.src}
        alt={renderedImage.alt}
      />
      <div className={styles.controls}>
        <p onClick={prevImage}>{'<'}</p>
        <p onClick={nextImage}>{'>'}</p>
      </div>

      <div>
        <p>{renderedImage.description}</p>
        <p>{renderedImage.location}</p>
        <p>{getAge(renderedImage.date)}</p>
      </div>
    </Fade>
  );
}

export default MainImage;
