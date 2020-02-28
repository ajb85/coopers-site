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
  const offset = showMenu
    ? window.innerWidth * 0.2 <= 300
      ? 300
      : window.innerWidth * 0.2
    : 0;
  return {
    width: Math.round(window.innerWidth - offset),
    rawWidth: window.innerWidth,
    height: window.innerHeight,
    offset
  };
}
