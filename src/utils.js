import dayjs from 'dayjs';

const humanizeRuntime = (runtime) => {
  const hours = Math.floor(runtime/60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

// const isActiveButton = (button) => button === true ? 'film-card__controls-item--active' : ''; // у watchList не появляется класс
// const isActiveButtonPopup = (button) => button === true ? 'film-details__control-button--active' : '';

const DATE_FORMATS = {
  'release-date': 'D MMM YYYY',
  'comment-date': 'YYYY/M/DD HH:mm',
  'preview-date': 'YYYY',
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatInteger = (a = 0, b = 1, float = 1) => (Math.random() * (b - a) + a).toFixed(float);

const normalizeFilmDate = (date, placeDate = 'release-date') => dayjs(date).format(DATE_FORMATS[placeDate]);

export {
  getRandomInteger,
  getRandomFloatInteger,
  normalizeFilmDate,
  humanizeRuntime,
  // isActiveButton,
  // isActiveButtonPopup
};
