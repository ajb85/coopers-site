import React, { useState } from 'react';
import moment from 'moment';
import InputRange from 'react-input-range';

import styles from './styles.module.scss';

function Filter({ showFilter, setShowFilter }) {
  const [dates, setDates] = useState({
    min: '2019-11-30',
    max: '2020-02-25'
  });

  const [ages, setAges] = useState({
    min: 0,
    max: moment().diff('2019-11-30', 'days')
  });

  return (
    <form
      className={styles.Filter}
      style={{ height: showFilter ? '150px' : '25px' }}
    >
      <div
        onClick={() => setShowFilter(!showFilter)}
        style={{ display: 'flex' }}
      >
        <p>{showFilter ? 'Hide' : 'Show'} Filter</p>
        <p
          className={styles.arrows}
          style={{ transform: `rotate(${showFilter ? '-' : ''}90deg)` }}
        >
          >>
        </p>
      </div>
      <div>
        <p>Show images taken between:</p>
        <input type="date" />
        and
        <input type="date" />
      </div>
      <div>
        <p>Cooper's Age:</p>
        <InputRange
          maxValue={moment().diff('2019-11-30', 'days')}
          minValue={0}
          value={ages}
          onChange={v => setAges(v)}
        />
      </div>
    </form>
  );
}

export default Filter;
