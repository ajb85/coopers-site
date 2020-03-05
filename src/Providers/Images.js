import React, { useState, useEffect, createContext } from 'react';

import axiosBE from 'axios.js';
import OrderedMap from 'js/OrderedMap.js';

export const ImagesContext = createContext();

export function Images(props) {
  const [images, setImages] = useState(new OrderedMap());
  const [active, setActive] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched && !images.length) {
      setFetched(true);
      axiosBE
        .get('/images/all')
        .then(({ data }) => setImages(new OrderedMap(data)))
        .catch(err => console.log('ERROR FETCHING IMAGES: ', err));
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

  function setLastImage() {
    setActive(images.lastID());
  }

  const { Provider } = ImagesContext;

  const image = images.get(active);

  return (
    <Provider
      value={{
        images,
        image,
        nextImage,
        prevImage,
        setImage,
        active,
        setLastImage
      }}
    >
      {props.children}
    </Provider>
  );
}
