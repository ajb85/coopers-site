import React, { useState, useEffect, createContext } from 'react';

import realmBE from 'axios.js';
import OrderedMap from 'js/OrderedMap.js';

export const ImagesContext = createContext();

export function Images(props) {
  const [images, setImages] = useState(new OrderedMap());
  const [fetched, setFetched] = useState(false);
  console.log(images.storage);

  useEffect(() => {
    if (!fetched) {
      setFetched(true);
      realmBE
        .get('/images/all')
        .then(({ data }) => setImages(new OrderedMap(data)))
        .catch(err => console.log('ERROR FETCHING IMAGES: ', err));
    }
  }, [images, setImages, fetched]);

  const { Provider } = ImagesContext;

  return <Provider value={{ images, setImages }}>{props.children}</Provider>;
}
