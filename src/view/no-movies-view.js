import AbstractView from '../framework/view/abstract-view.js';

const createNoMoviesTemplate = () => '<h2 className="films-list__title">There are no movies in our database</h2>';

export default class NoMoviesView extends AbstractView {
  get template() {
    return createNoMoviesTemplate();
  }
}

