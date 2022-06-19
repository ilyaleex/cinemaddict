import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTotalTemplate = (films) => (
  `<section class="footer__statistics">
    <p>${(films.length)} movies inside</p>
  </section>`
);

export default class FilmsTotalView extends AbstractView {
  #films;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilmsTotalTemplate(this.#films);
  }
}
