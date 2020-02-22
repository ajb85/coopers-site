import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import axiosBE from 'axios.js';

import ImagesForm from '../ImagesForm/';

import styles from './styles.module.scss';

export default function Upload(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const noRender = state.images.reduce((acc, { render }, i) => {
      if (!render) {
        acc.push(i);
      }
      return acc;
    }, []);

    if (noRender.length) {
      noRender.forEach(index => {
        const file = state.images[index].file;
        // New instance of FileReader per loop
        const reader = new FileReader();

        reader.onload = e => {
          // Event listener for when the file is read
          // (save to state)
          dispatch({
            type: 'ADD_RENDER',
            payload: { index, render: e.target.result }
          });
        };

        // Read file
        reader.readAsDataURL(file);
      });
    }
  }, [state, dispatch]);

  const selectImages = e => {
    const { files } = e.target;

    [...files].forEach(payload => {
      const isNewFile = !state.images.find(
        ({ file }) => file.filename === payload.fileName
      );
      if (isNewFile) {
        dispatch({ type: 'ADD_FILE', payload });
      } else {
        console.log('That file is already uploaded');
      }
    });
  };

  const deletePreview = i => {
    dispatch({ type: 'REMOVE_IMAGE', payload: i });
  };

  const submitImages = async (e, index) => {
    if (e) {
      e.preventDefault();
    }
    // Cancel request if missing data
    if (index !== undefined) {
      const { description, age } = state.images[index].data;
      if (!description || age === undefined) {
        console.log('MISSING DESCRIPTION OR AGE', description, age);
        return;
      }
    } else {
      for (let i = 0; i < state.images.length; i++) {
        const { description, age } = state.images[i].data;
        if (!description || age === undefined) {
          console.log('MISSING DESCRIPTION OR AGE');
          return;
        }
      }
    }

    // Begin request
    try {
      const files = index ? [state.images[index]] : state.images;

      const signed = await Promise.all(
        files.map(({ file }, i) => {
          dispatch({ type: 'SET_PENDING', payload: index || i });
          return axiosBE.post('/images/sign', {
            fileName: file.name,
            fileType: file.type
          });
        })
      ).then(res => res.map(({ data }) => data));

      await Promise.all(
        signed.map(async ({ signedRequest, url }, i) => {
          const selected = index || i;
          const { description, age, alt, location } = state.images[
            selected
          ].data;
          const image = state.images[selected].file;
          console.log('URL: ', url);

          await axios.put(signedRequest, image);
          /*const newImage =*/ await axiosBE.post('/images/confirmed', {
            src: url,
            description,
            age,
            alt,
            location
          });

          dispatch({ type: 'REMOVE_IMAGE', payload: selected });
        })
      );
    } catch (err) {
      console.log('ERROR GETTING SIGNS: ', err);
    }
  };

  const updateImageData = (e, i) => {
    dispatch({
      type: 'UPDATE_IMAGE_DATA',
      payload: { name: e.target.name, index: i, value: e.target.value }
    });
  };

  return (
    <>
      {/* Select Images */}
      <label className={styles.uploadButton}>
        Upload Images
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          accept="image/png, image/jpeg"
          onChange={e => selectImages(e)}
        />
      </label>
      {/* File names of selected images */}
      <div className={styles.fileNames}>
        {state.images.length > 0
          ? state.images.map((img, i) => {
              const f = img.file;
              return (
                <span key={i} style={{ margin: 10 }}>
                  {f.name}
                </span>
              );
            })
          : ''}
      </div>

      {/* Images Previews */}
      <div className={styles.imageSubmitContainer}>
        <ImagesForm
          removeCard={deletePreview}
          renderList={state.images.map(img => ({
            src: img.render,
            data: img.data,
            pending: img.pending
          }))}
          submit={submitImages}
          updateForm={updateImageData}
        />

        {state.images.length > 0 && (
          <button type="button" onClick={submitImages}>
            Submit All Images
          </button>
        )}
      </div>
    </>
  );
}

const initialState = {
  images: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FILE':
      return {
        ...state,
        images: [
          ...state.images,
          {
            file: action.payload,
            render: null,
            data: { alt: '', description: '', age: 0, location: '' },
            pending: false
          }
        ]
      };
    case 'ADD_RENDER':
      return {
        ...state,
        images: state.images.map((img, i) =>
          i === action.payload.index
            ? { ...img, render: action.payload.render }
            : img
        )
      };
    case 'REMOVE_IMAGE':
      return {
        ...state,
        images: state.images.filter((_, i) => action.payload !== i)
      };
    case 'UPDATE_IMAGE_DATA':
      return {
        ...state,
        images: state.images.map((img, i) => {
          if (i === action.payload.index) {
            const { name, value } = action.payload;
            return { ...img, data: { ...state.images[i].data, [name]: value } };
          }
          return img;
        })
      };
    case 'SET_PENDING':
      return {
        ...state,
        images: state.images.map((img, i) =>
          i === action.payload ? { ...img, pending: true } : img
        )
      };
    case 'SET_FAILED_REQUEST':
      return {
        ...state,
        images: state.images.map((img, i) =>
          i === action.payload ? { ...img, pending: null } : img
        )
      };
    default:
      return state;
  }
}
