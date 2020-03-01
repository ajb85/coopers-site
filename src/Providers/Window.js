import React, { useState, useEffect, createContext, useRef } from 'react';

export const WindowContext = createContext();

let interval;
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
    if (interval) {
      clearInterval(interval);
    }
    if (menuRef.current) {
      if (value) {
        menuRef.current.style.display = 'initial';
      } else {
        interval = setTimeout(() => {
          menuRef.current.style.display = 'none';
          interval = null;
        }, 525);
      }
    }
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
  const offset = showMenu
    ? window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 0;

  const width =
    isTablet || isMobile
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
