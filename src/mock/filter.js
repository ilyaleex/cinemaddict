import {filter} from '../utils/filter.js';

export const generateFilter = (filmCards) => Object.entries(filter).map(
  ([filterName, filterFilmCards]) => ({
    name: filterName,
    count: filterFilmCards(filmCards).length,
  }),
);
