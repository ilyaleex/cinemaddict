import AbstractView from '../framework/view/abstract-view.js';
import {getFilteredFilms} from '../mock/filters.js';

const createFilterTemplate = (films) => {
  const filteredFilms = getFilteredFilms(films);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filteredFilms.watchlist.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filteredFilms.history.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filteredFilms.favorite.length}</span></a>
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #films = null;

  constructor (films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilterTemplate(this.#films);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.main-navigation').addEventListener('click', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'SPAN' || evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.click();
  };
}
