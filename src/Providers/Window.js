import React, { useState, useEffect, createContext, useRef } from 'react';

export const WindowContext = createContext();

export function Window(props) {
  const lastMenuSetting = localStorage.getItem('showMenu');
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(
    lastMenuSetting === 'true' || lastMenuSetting === undefined ? true : false
  );
  const [windowSize, setWindowSize] = useState(getWindowSize(showMenu));

  useEffect(() => {
    const resizeWindow = () => {
      setWindowSize(getWindowSize(showMenu));
      document.body.style.height = window.innerHeight + 'px';
      document.body.style.width = window.innerWidth + 'px';

      document.documentElement.style.height = window.innerHeight + 'px';
      document.documentElement.style.width = window.innerWidth + 'px';
    };
    const removeListener = () =>
      window.removeEventListener('resize', resizeWindow);

    resizeWindow();
    removeListener();

    window.addEventListener('resize', resizeWindow);

    return removeListener;
    // eslint-disable-next-line
  }, [showMenu]);

  const updateShowMenu = value => {
    setShowMenu(value);
    localStorage.setItem('showMenu', value);
  };

  const { Provider } = WindowContext;
  return (
    <Provider
      value={{
        windowSize,
        showMenu,
        setShowMenu: updateShowMenu,
        ref: menuRef
      }}
    >
      {props.children}
    </Provider>
  );
}

function getWindowSize(showMenu) {
  const isTablet = window.innerWidth < 1000 && window.innerWidth >= 600;
  const isMobile = window.innerWidth < 600;
  const offset =
    !showMenu || isMobile
      ? 0
      : window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2;

  const sideMenuWidth = showMenu
    ? isMobile
      ? window.innerWidth
      : window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 125;

  const width =
    isTablet || isMobile
      ? window.innerWidth
      : Math.round(window.innerWidth - offset);

  const height = isMobile ? window.innerHeight - 80 : window.innerHeight;

  return {
    width,
    height,
    rawHeight: window.innerHeight,
    rawWidth: window.innerWidth,
    sideMenuWidth,
    offset,
    isTablet,
    isMobile
  };
}
