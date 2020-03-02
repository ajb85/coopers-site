import moment from 'moment';

export default date_str => {
  if (!date_str) {
    return '';
  }

  const birth = moment('2019-11-30', 'YYYY-MM-DD');
  const date = moment(date_str, 'YYYY-MM-DD');
  if (date.diff(birth, 'days') === 0) {
    return 'Birth';
  }

  let time = date.diff(birth, 'days');
  let measurement = time > 1 ? 'days' : 'day';

  if (time >= 7) {
    time = Math.round(time / 7);
    measurement = time > 1 ? 'weeks' : 'week';
  }

  if (time > 4) {
    time = date.diff(birth, 'months');
    measurement = time > 1 ? 'months' : 'month';
  }

  if (time >= 12) {
    time = date.diff(birth, 'years');
    measurement = time > 1 ? 'years' : 'year';
  }

  return `${time} ${measurement} old`;
};
