const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

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
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const ExtraFilmTitle = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented'
};

const ApiMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {EMOTIONS, FilterType, SortingType, PopupState, UserAction, UpdateType, ExtraFilmTitle, ApiMethod};
