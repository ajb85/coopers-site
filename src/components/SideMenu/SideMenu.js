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

  const width = window.innerWidth * 0.2 <= 300 ? 300 : window.innerWidth * 0.2;

  const right = showMenu ? 0 : -width;

  return (
    <div
      ref={ref}
      className={styles.SideMenu}
      style={{
        right,
        width,
        display: showMenu && 'initial',
        margin: showMenu && windowSize.isMobile && '0 auto',
        height: windowSize.isMobile && windowSize.height
      }}
    >
      <div className={styles.menuClose} onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={['fal', 'times']} />
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <img src={logo} alt='Cooper Logo' />
      </div>

      {/* Render Image List */}
      <div
        className={styles.imagesContainer}
        style={{ minWidth: windowSize.sideMenuWidth * 0.9 }}
      >
        {renderImages()}
      </div>
    </div>
  );
}

export default SideMenu;
