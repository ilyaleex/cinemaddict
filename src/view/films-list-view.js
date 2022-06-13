import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListElement = (isExtraFilmsList = false, filmsListTitle = '') => (
  `<section class="films-list ${isExtraFilmsList ? 'films-list--extra' : ''}">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    ${isExtraFilmsList ? `<h2 class="films-list__title">${filmsListTitle}</h2>` : ''}
    <div class="films-list__container"></div>
  </section>`
);

export default class FilmsListView extends AbstractView {
  #isExtraFilmsList = false;
  #filmsListTitle = '';

  constructor(isExtraFilmsList, filmsListTitle) {
    super();
    this.#isExtraFilmsList = isExtraFilmsList;
    this.#filmsListTitle = filmsListTitle;
  }

  get template() {
    return createFilmsListElement(this.#isExtraFilmsList, this.#filmsListTitle);
  }
}
