import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ImagesContext } from 'Providers/Images.js';
import getAge from 'js/getAge.js';

import Fade from 'styles/components/Fade/';
import styles from './styles.module.scss';

let interval;
function MainImage({ showMenu, setShowMenu, windowSize }) {
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
    if (!transition) {
      setTransition(true);
    }
    if (interval) {
      clearInterval(interval);
    }
    interval = setTimeout(() => {
      setTransition(false);
      setRenderedImage(image);
      interval = setTimeout(() => {
        setTransition(null);
        interval = null;
      }, 1000);
    }, 500);
    // eslint-disable-next-line
  }, [image]);

  if (!image) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!windowSize.isMobile && (
        <div className={styles.menuOpen}>
          <FontAwesomeIcon
            className={styles.menuOpen}
            onClick={() => setShowMenu(true)}
            icon={['fal', 'bars']}
          />
        </div>
      )}
      <Fade
        style={{ width: windowSize.width, height: windowSize.height }}
        direction={transition ? 'out' : transition === false ? 'in' : 'done'}
      >
        <img
          style={imageSize.width && imageSize.height ? imageSize : null}
          src={renderedImage.src}
          alt={renderedImage.alt}
        />
        {!windowSize.isMobile && (
          <div className={styles.controls}>
            <FontAwesomeIcon
              icon={['fal', 'arrow-alt-left']}
              onClick={prevImage}
            />
            <FontAwesomeIcon
              icon={['fal', 'arrow-alt-right']}
              onClick={nextImage}
            />
          </div>
        )}

        <div>
          <p>{renderedImage.description}</p>
          <p>{renderedImage.location}</p>
          <p>{getAge(renderedImage.date)}</p>
        </div>
      </Fade>
    </>
  );
}

export default MainImage;
