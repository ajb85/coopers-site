import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

export default function Manage(prop) {
  const [images, setImages] = useState({
    loading: false,
    files: [],
    render: []
  });

  useEffect(() => {
    if (images.files.length > images.render.length) {
      for (let i = images.render.length; i < images.files.length; i++) {
        // New instance of FileReader per loop
        const reader = new FileReader();

        reader.onload = e => {
          // Event listener for when the file is read
          // (save to state)
          setImages({ ...images, render: [...images.render, e.target.result] });
        };

        // Read file
        reader.readAsDataURL(images.files[i]);
      }
    } else if (images.files.length < images.render.length) {
      setImages({
        ...images,
        render: images.render.slice(0, images.files.length)
      });
    }
  }, [images, setImages]);

  const selectImages = e => {
    const { files } = e.target;
    setImages({ ...images, files: [...images.files, ...files] });
  };

  const deletePreview = i => {
    setImages({
      ...images,
      files: images.files.filter((_, index) => index !== i),
      render: images.render.filter((_, index) => index !== i)
    });
  };

  return (
    <div style={{ marginTop: 20 }}>
      <label className={styles.uploadButton}>
        Upload Images
        <Input onChange={selectImages} />{' '}
      </label>
      {images.files.length > 0
        ? images.files.map(f => <span style={{ margin: 10 }}>{f.name}</span>)
        : ''}
      <div className={styles.imagePreviews}>
        {images.render.map((img, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <p onClick={deletePreview.bind(this, i)}>x</p>
            <img src={img} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      type='file'
      multiple
      style={{ display: 'none' }}
      accept='image/png, image/jpeg'
      onChange={e => props.onChange(e)}
    />
  );
}
