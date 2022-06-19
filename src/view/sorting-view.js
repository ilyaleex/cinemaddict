import AbstractView from '../framework/view/abstract-view.js';
import {SortingType} from '../utils/const.js';

const createSortingTemplate = (currentSortingType) => (
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortingType.DEFAULT}" class="sort__button ${currentSortingType === SortingType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortingType.DATE}" class="sort__button ${currentSortingType === SortingType.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortingType.RATING}" class="sort__button ${currentSortingType === SortingType.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`
);

export default class SortingView extends AbstractView {
  #currentSortingType = null;

  constructor(currentSortingType) {
    super();
    this.#currentSortingType = currentSortingType;
  }

  get template() {
    return createSortingTemplate(this.#currentSortingType);
  }

  setSortingTypeChangeHandler = (callback) => {
    this._callback.sortingTypeChange = callback;
    this.element.addEventListener('click', this.#sortingTypeChangeHandler);
  };

  #sortingTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortingTypeChange(evt.target.dataset.sortType);
  };
}
