const FilterType = {
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const filter = {
  [FilterType.WATCHLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.watchlist),
  [FilterType.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.alreadyWatched),
  [FilterType.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.favorite)
};

export {filter};

