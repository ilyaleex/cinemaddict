import {createElement} from '../render.js';

const createMovieAmountTemplate = () => '<p>130 291 movies inside</p>';

export default class MovieAmountView {
  #element = null;

  get template() {
    return createMovieAmountTemplate();
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

