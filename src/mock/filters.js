export const getFilteredFilms = (films) => ({
  watchlist: films.filter((film) => film.userDetails.watchlist),
  history: films.filter((film) => film.userDetails.alreadyWatched),
  favorite: films.filter((film) => film.userDetails.favorite)
});
