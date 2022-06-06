import AbstractView from '../framework/view/abstract-view.js';

const createMovieAmountTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsAmountView extends AbstractView {
  get template() {
    return createMovieAmountTemplate();
  }
}

