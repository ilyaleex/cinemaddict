import {createElement} from '../render.js';

const createNoMoviesTemplate = () => '<h2 className="films-list__title">There are no movies in our database</h2>';

export default class NoMoviesView {
  #element = null;

  get template() {
    return createNoMoviesTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

