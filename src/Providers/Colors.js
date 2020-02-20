import React, { useState, createContext } from 'react';

export const ColorsContext = createContext();

export function Colors(props) {
  const [color, setColor] = useState({
    text: 'white',
    background: 'black'
  });

  const { Provider } = ColorsContext;

  return <Provider value={{ color, setColor }}>{props.children}</Provider>;
}
