import dayjs from 'dayjs';

const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

const sortFilmsByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

const sortFilmsByCommentsAmount = (filmA, filmB) => (filmB.comments.length - filmA.comments.length);

export {sortFilmsByDate, sortFilmsByRating, sortFilmsByCommentsAmount};
