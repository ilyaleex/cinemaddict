import dayjs from 'dayjs';

const humanizeRuntime = (runtime) => {
  const hours = ~~(runtime/60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

const isActiveButton = (button) => button === true ? 'film-card__controls-item--active' : ''; // у watchList не появляется класс
const isActiveButtonPopup = (button) => button === true ? 'film-details__control-button--active' : '';

const DATE_FORMATS = {
  'release-date': 'D MMM YYYY',
  'comment-date': 'YYYY/M/DD HH:mm',
  'preview-date': 'YYYY',
};

const normalizeFilmDate = (date, placeDate = 'release-date') => dayjs(date).format(DATE_FORMATS[placeDate]);

export {
  normalizeFilmDate,
  humanizeRuntime,
  isActiveButton,
  isActiveButtonPopup
};
