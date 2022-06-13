const ProfileRating = {
  NOVICE: {
    name: 'Novice',
    minFilmsAmount: 1,
  },
  FAN: {
    name: 'Fan',
    minFilmsAmount: 11,
  },
  MOVIE_BUFF: {
    name: 'Movie Buff',
    minFilmsAmount: 21,
  }
};

const getWatchedFilmsAmount = (films) => (films.filter((film) => film.userDetails.alreadyWatched).length);

const getProfileRating = (films) => {
  const watchedFilmsAmount = getWatchedFilmsAmount(films);

  switch (true) {
    case (watchedFilmsAmount >= ProfileRating.MOVIE_BUFF.minFilmsAmount):
      return ProfileRating.MOVIE_BUFF.name;
    case watchedFilmsAmount >= ProfileRating.FAN.minFilmsAmount:
      return ProfileRating.FAN.name;
    case watchedFilmsAmount >= ProfileRating.NOVICE.minFilmsAmount:
      return ProfileRating.NOVICE.name;
  }
};

export {getProfileRating};
