const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const SortingType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const PopupState = {
  HIDDEN: 'HIDDEN',
  OPEN: 'OPEN'
};

const UserAction = {
  UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const ExtraFilmTitle = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

export {FilterType, SortingType, PopupState, UserAction, UpdateType, ExtraFilmTitle};
