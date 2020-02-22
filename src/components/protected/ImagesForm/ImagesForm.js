import React from 'react';

import styles from './styles.module.scss';

function ImagesForm(props) {
  const { renderList, removeCard, submit, updateForm } = props;

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
                value={img.data.age}
                type="number"
                onChange={e => updateForm(e, i)}
                name="age"
                placeholder="age (days)"
              />
              <input
                value={img.data.location}
                type="text"
                onChange={e => updateForm(e, i)}
                name="location"
                placeholder="location"
              />
              <button type="submit">{buttonText}</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default ImagesForm;
