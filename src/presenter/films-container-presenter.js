import {render, remove} from '../framework/render.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import NoMoviesView from '../view/no-movies-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmCardModel from '../model/film-card-model.js';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsContainerPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #buttonShowMoreComponent = new ButtonShowMoreView();
  #noMoviesComponent = new NoMoviesView();

  #filmsList = [];
  // #comments = [];

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmsList = [...this.#filmsModel.filmCards];
    // this.#comments = [...this.#filmsModel.filmComments];
    this.#renderFilmsContainer();
  };

  #renderFilmsContainer = () => {
    render(this.#filmsContainerComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsContainerComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    render(this.#filmsListTopRatedComponent, this.#filmsContainerComponent.element);
    render(this.#filmsListMostCommentedComponent, this.#filmsContainerComponent.element);

    this.#renderFilmCardsList();

    if (this.#filmsList.length === 0) {
      this.#renderNoMoviesComponent();
    }
  };

  #renderFilmCardsList = () => {
    this.#renderFilmCards(0, Math.min(this.#filmsList.length, FILMS_COUNT_PER_STEP));
    if (this.#filmsList.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderShowMoreButton = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#handleButtonShowMoreClick);
  };

  #renderNoMoviesComponent = () => {
    render(this.#noMoviesComponent, this.#filmsListComponent.element);
  };

  #renderFilmCards = (from, to) => {
    this.#filmsList
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard));
  };

  #handleButtonShowMoreClick = () => {
    this.#renderFilmCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsList.length) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #renderFilmCard = (filmCard) => {
    const filmCardModel = new FilmCardModel();
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListContainerComponent.element, filmCardModel);
    filmCardPresenter.init(filmCard);
  };
}

