import React, { useState, useEffect, useContext } from 'react';

import { ImagesContext } from 'Providers/Images.js';
import getAge from 'js/getAge.js';

import Fade from 'styles/components/Fade/';
import styles from './styles.module.scss';

function MainImage({ showMenuState: [showMenu], windowSize }) {
  const { nextImage, image, prevImage } = useContext(ImagesContext);
  const [transition, setTransition] = useState(false);
  const [renderedImage, setRenderedImage] = useState(image);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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
  }, [windowSize, renderedImage, showMenu]);

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
    <Fade
      style={{ width: windowSize.width }}
      direction={transition ? 'out' : transition === false ? 'in' : 'done'}
    >
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
