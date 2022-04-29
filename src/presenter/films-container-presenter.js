import {render} from '../render.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';

export default class FilmsContainerPresenter {
  filmsContainerComponent = new FilmsContainerView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsContainerComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new ButtonShowMoreView(), this.filmsListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(new PopupFilmDetailsView(), this.filmsContainerComponent.getElement());
  };
}
