import React, { /*useState,*/ useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import Filter from '../Filter/';

import { ImagesContext } from 'Providers/Images.js';
import { WindowContext } from 'Providers/Window.js';

import logo from '../../assets/logo.png';
import styles from './styles.module.scss';

function SideMenu(props) {
  const { images, image, setImage } = useContext(ImagesContext);
  const { ref, showMenu, setShowMenu, windowSize } = useContext(WindowContext);
  // const [showFilter, setShowFilter] = useState(true);

  const handleImageClick = id => {
    if (windowSize.isTablet || windowSize.isMobile) {
      setShowMenu(false);
    }
    setImage(id);
  };
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
          onClick={handleImageClick.bind(this, img.id)}
        >
          <img style={style} src={img.src} alt={`Thumbnail.  ${img.alt}`} />
        </div>
      );
    });
  };

  return (
    <div
      ref={ref}
      className={styles.SideMenu}
      style={{
        right: windowSize.isMobile
          ? showMenu
            ? 0
            : -windowSize.rawWidth
          : showMenu
          ? 0
          : windowSize.width * 0.2 <= 300
          ? -300
          : -windowSize.width * 0.2,
        display: showMenu && 'initial'
      }}
    >
      <div className={styles.menuClose} onClick={() => setShowMenu(false)}>
        <FontAwesomeIcon icon={['fal', 'times']} />
      </div>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={logo} alt='Cooper Logo' />
      </div>

      {/* Filter Options */}
      {/* <Filter showFilter={showFilter} setShowFilter={setShowFilter} /> */}
      {/* Render Image List */}
      <div className={styles.imagesContainer}>{renderImages()}</div>
    </div>
  );
}

export default SideMenu;
