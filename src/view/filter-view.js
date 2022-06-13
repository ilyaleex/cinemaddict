import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils/const.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${type}"
      class="main-navigation__item
      ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
      data-filter-type="${type}">
      ${name}
      ${type !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ''}</a>`
  );
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filtersItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
  return (
    `<nav class="main-navigation">
      ${filtersItemsTemplate}
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('click', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'SPAN' && evt.target.tagName !== 'A') {
      return;
    }
    const targetElement = evt.target.tagName === 'A' ? evt.target : evt.target.parentElement;
    evt.preventDefault();
    this._callback.filterChange(targetElement.dataset.filterType);
  };
}
