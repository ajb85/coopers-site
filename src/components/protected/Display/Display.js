import React, { useState, useEffect } from 'react';

import ImagesForm from '../ImagesForm/';
import axiosBE from 'axios.js';

import formStyles from '../Upload/styles.module.scss';

function Display(props) {
  const [images, setImages] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!images.length && !hasFetched) {
      setHasFetched(true);
      axiosBE
        .get('/images/all')
        .then(({ data }) => setImages(data))
        .catch(err => console.log('ERROR fetching data: ', err));
    }
  }, [images, setImages, hasFetched, setHasFetched]);

  const deleteImage = index => {
    const { id } = images[index];

    axiosBE
      .delete(`/images/${id}`)
      .then(_ => setImages(images.filter((_, i) => i !== index)))
      .catch(err => console.log('ERR deleting image: ', err));
  };

  const saveFormChanges = (e, index) => {
    if (e) {
      e.preventDefault();
    }

    const { id, credit_name, credit, credit_link, ...image } = images[index];

    image.credit_id = credit === 'None' ? null : credit;

    axiosBE
      .put(`/images/edit/${id}`, image)
      .then(_ => _)
      .catch(err => console.log('ERR updating image: ', err));
  };

  const handleFormData = (e, index) => {
    const { name, value } = e.target;
    setImages(
      images.map((img, i) => (i === index ? { ...img, [name]: value } : img))
    );
  };

  return (
    <div>
      <ImagesForm
        styles={formStyles}
        renderList={images.map(d => {
          const {
            description,
            alt,
            date,
            location,
            width,
            height,
            credit,
            tags,
            ...img
          } = d;
          return {
            ...img,
            data: {
              description,
              alt,
              date,
              location,
              height,
              width,
              tags,
              credit: credit || 'None'
            },
            pending: false
          };
        })}
        removeCard={deleteImage}
        submit={saveFormChanges}
        updateForm={handleFormData}
      />
    </div>
  );
}

export default Display;
