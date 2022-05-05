import {render, RenderPosition} from '../render.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';

const footer = document.querySelector('.footer');

export default class FilmsContainerPresenter {
  filmsContainerComponent = new FilmsContainerView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  filmsListTopRatedComponent = new FilmsListTopRatedView();
  filmsListMostCommentedComponent = new FilmsListMostCommentedView();

  init = (filmsContainer, filmsModel, filmCardPopupModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.filmsList = [...this.filmsModel.getFilmCards()];

    this.filmCardPopupModel = filmCardPopupModel;
    this.filmsPopup = [...this.filmCardPopupModel.getFilmPopupCard()];

    render(this.filmsContainerComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new ButtonShowMoreView(), this.filmsListComponent.getElement());
    render(this.filmsListTopRatedComponent, this.filmsContainerComponent.getElement());
    render(this.filmsListMostCommentedComponent, this.filmsContainerComponent.getElement());

    for (let i = 0; i < this.filmsList.length; i++) {
      render(new FilmCardView(this.filmsList[i]), this.filmsListContainerComponent.getElement());
    }

    render(new PopupFilmDetailsView(this.filmsPopup), footer, RenderPosition.AFTEREND);
  };
}
