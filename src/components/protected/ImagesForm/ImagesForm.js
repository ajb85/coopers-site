import React, { useState, useEffect } from 'react';

import axiosBE from 'axios.js';

import styles from './styles.module.scss';

function ImagesForm(props) {
  const [credits, setCredits] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      setFetched(true);

      axiosBE
        .get('/images/credits')
        .then(({ data }) =>
          setCredits(
            data.reduce((acc, credit) => {
              acc[credit.id] = credit.name;
              return acc;
            }, {})
          )
        )
        .catch(err => console.log('ERROR GETTING CREDITS: ', err));
    }
  }, [fetched, setCredits, setFetched]);

  const { renderList, removeCard, submit, updateForm } = props;

  const renderOptions = () => {
    return Object.entries(credits).map(([id, name]) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  };

  return (
    <div className={styles.imagePreviews}>
      {renderList.map((img, i) => {
        const buttonText =
          img.pending === false
            ? 'Save Image'
            : img.pending === true
            ? 'Please wait'
            : img.pending === false
            ? 'Save Image'
            : 'Request Failed, Try Again?';
        return (
          <div key={img.id || i} className={styles.imageContainer}>
            <div
              key={i}
              style={{
                position: 'relative',
                minHeight: 265,
                overflow: 'hidden'
              }}
            >
              <p onClick={removeCard.bind(this, i)}>x</p>
              <img src={img.src} alt="Uploaded" />
            </div>
            <form onSubmit={e => submit(e, i)}>
              <span style={{ marginTop: 10 }}>
                {img.data.width} x {img.data.height}
              </span>
              <input
                value={img.data.alt}
                type="text"
                onChange={e => updateForm(e, i)}
                name="alt"
                placeholder="alt"
              />
              <input
                value={img.data.description}
                type="text"
                onChange={e => updateForm(e, i)}
                name="description"
                placeholder="description"
              />
              <input
                value={img.data.date}
                type="date"
                onChange={e => updateForm(e, i)}
                name="date"
                placeholder="Date of photograph"
              />
              <input
                value={img.data.location}
                type="text"
                onChange={e => updateForm(e, i)}
                name="location"
                placeholder="location"
              />
              <input
                value={img.data.tags}
                type="text"
                onChange={e => updateForm(e, i)}
                name="tags"
                placeholder="Tags"
              />
              <select
                name="credit"
                value={img.data.credit}
                onChange={e => updateForm(e, i)}
              >
                <option value={'None'}>None</option>
                {renderOptions()}
              </select>
              <button type="submit">{buttonText}</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default ImagesForm;
