import React, { useReducer, useEffect } from 'react';

import styles from './styles.module.scss';

export default function Manage(prop) {
  const [images, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (images.files.length > images.render.length) {
      for (let i = images.render.length; i < images.files.length; i++) {
        // New instance of FileReader per loop
        const reader = new FileReader();

        reader.onload = e => {
          // Event listener for when the file is read
          // (save to state)
          dispatch({ type: 'ADD_RENDER', payload: e.target.result });
        };

        // Read file
        reader.readAsDataURL(images.files[i]);
      }
    } else if (images.files.length < images.render.length) {
      dispatch({ type: 'REMOVE_IMAGE', payload: images.render.length - 1 });
    }
  }, [images, dispatch]);

  const selectImages = e => {
    const { files: payload } = e.target;
    dispatch({ type: 'ADD_FILE', payload });
  };

  const deletePreview = i => {
    dispatch({ type: 'REMOVE_IMAGE', payload: i });
  };

  return (
    <div style={{ marginTop: 20 }}>
      <label className={styles.uploadButton}>
        Upload Images
        <Input onChange={selectImages} />{' '}
      </label>
      {images.files.length > 0
        ? images.files.map((f, i) => (
            <span key={i} style={{ margin: 10 }}>
              {f.name}
            </span>
          ))
        : ''}
      <div className={styles.imagePreviews}>
        {images.render.map((img, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <p onClick={deletePreview.bind(this, i)}>x</p>
            <img src={img} alt='Uploaded Image' />
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

const initialState = {
  files: [],
  render: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FILE':
      return { ...state, files: [...state.files, ...action.payload] };
    case 'ADD_RENDER':
      return { ...state, render: [...state.render, action.payload] };
    case 'REMOVE_IMAGE':
      return {
        ...state,
        files: state.files.filter((_, index) => index !== action.payload),
        render: state.render.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
