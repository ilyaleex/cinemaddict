import {createElement} from '../render.js';

const createMovieAmountTemplate = () => '<p>130 291 movies inside</p>';

export default class MovieAmountView {
  getTemplate() {
    return createMovieAmountTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}

