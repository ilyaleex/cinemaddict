import dayjs from 'dayjs';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');

const humanizeReleaseDatePopup = (releaseDate) => dayjs(releaseDate).format('MM MMMM YYYY');

const humanizeCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD h:mm');

const humanizeRuntime = (runtime) => {
  const hours = Math.floor(runtime/60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

const isActive = (button) => button === true ? 'film-card__controls-item--active' : ''; // у watchList не появляется класс

export {
  getRandomInteger,
  getRandomPositiveFloat,
  humanizeReleaseDate,
  humanizeReleaseDatePopup,
  humanizeCommentDate,
  humanizeRuntime,
  isActive
};
