import React, { useState, useEffect, createContext } from 'react';

export const WindowSizeContext = createContext();

export function Window(props) {
  const lastMenuSetting = localStorage.getItem('showMenu');
  const [showMenu, setShowMenu] = useState(
    lastMenuSetting === 'true' || lastMenuSetting === undefined ? true : false
  );
  const [windowSize, setWindowSize] = useState(getWindowSize(showMenu));

  useEffect(() => {
    const resizeWindow = () => {
      setWindowSize(getWindowSize(showMenu));
      const vhUnit = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vhUnit}px`);
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

  const { Provider } = WindowSizeContext;
  return (
    <Provider value={{ windowSize, showMenu, setShowMenu: updateShowMenu }}>
      {props.children}
    </Provider>
  );
}

function getWindowSize(showMenu) {
  const isTablet = window.innerWidth < 1000 && window.innerWidth >= 600;
  const isMobile = window.innerWidth < 600;
  const offset = showMenu
    ? window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 0;

  const width = isTablet
    ? window.innerWidth
    : Math.round(window.innerWidth - offset);

  return {
    width,
    height: window.innerHeight,
    rawWidth: window.innerWidth,
    offset,
    isTablet,
    isMobile
  };
}
