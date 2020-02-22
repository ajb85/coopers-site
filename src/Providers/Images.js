import React, { useState, useEffect, createContext } from 'react';

import realmBE from 'axios.js';

export const ImagesContext = createContext();

export function Images(props) {
  const [images, setImages] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      setFetched(true);
      realmBE
        .get('/images/all')
        .then(({ data }) =>
          setImages(
            data.reduce((acc, img) => {
              acc[img.id] = img;
              return acc;
            }, {})
          )
        )
        .catch(err => console.log('ERROR FETCHING IMAGES: ', err));
    }
  }, [images, setImages]);

  const { Provider } = ImagesContext;

  return <Provider value={{ images, setImages }}>{props.children}</Provider>;
}
