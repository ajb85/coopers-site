import React, { useState, useContext } from 'react';

import Filter from '../Filter/';

import { ImagesContext } from 'Providers/Images.js';
import logo from '../../assets/logo.png';
import styles from './styles.module.scss';

function SideMenu({ showMenuState: [showMenu, setShowMenu], windowSize }) {
  const { images, image, setImage } = useContext(ImagesContext);
  const [showFilter, setShowFilter] = useState(true);

  const renderImages = () => {
    return images.map(img => {
      const style = {};
      if (img.height > img.width) {
        style.height = '100%';
      } else {
        style.width = '100%';
      }
      return (
        <div
          key={img.id}
          className={styles.imageWindow}
          style={{ opacity: img.id === image.id ? 0.3 : 1 }}
          onClick={() => setImage(img.id)}
        >
          <img style={style} src={img.src} alt={`Thumbnail.  ${img.alt}`} />
        </div>
      );
    });
  };

  return (
    <div
      className={styles.SideMenu}
      style={{
        right: showMenu
          ? 0
          : windowSize.width * 0.2 <= 300
          ? -300
          : -windowSize.width * 0.2
      }}
    >
      {/* Menu Options */}
      <div
        className={styles.menuControls}
        onClick={() => setShowMenu(!showMenu)}
      >
        <p>{showMenu ? '>' : '<'}</p>
      </div>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={logo} alt='Cooper Logo' />
      </div>

      {/* Filter Options */}
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      {/* Render Image List */}
      <div className={styles.imagesContainer}>{renderImages()}</div>
    </div>
  );
}

export default SideMenu;
