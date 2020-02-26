import React, { useState, useEffect, createContext } from 'react';

import realmBE from 'axios.js';
import OrderedMap from 'js/OrderedMap.js';

export const ImagesContext = createContext();

export function Images(props) {
  const [images, setImages] = useState(new OrderedMap());
  const [active, setActive] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched && !images.length) {
      setFetched(true);
      realmBE
        .get('/images/all')
        .then(({ data }) => {
          setImages(new OrderedMap(data));
        })
        .catch(err => console.log('ERROR FETCHING IMAGES: ', err));
    } else if (fetched && images.length) {
      setActive(images.lastID());
    }
    // eslint-disable-next-line
  }, [images, fetched]);
  function nextImage() {
    setActive(images.nextID(active));
  }

  function prevImage() {
    setActive(images.prevID(active));
  }

  function setImage(id) {
    setActive(id);
  }

  const { Provider } = ImagesContext;

  const image = images.get(active);

  return (
    <Provider value={{ images, image, nextImage, prevImage, setImage, active }}>
      {props.children}
    </Provider>
  );
}
