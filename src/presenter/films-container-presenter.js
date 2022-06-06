import {render, remove} from '../framework/render.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
// import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
// import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import SortingView from '../view/sorting-view.js';
import PopupFilmDetailsPresenter from './popup-film-details-presenter.js';
import {PopupState, SortType} from '../utils/const.js';
import {sortFilmsByDate, sortFilmsByRating, updateItem} from '../utils/sorting.js';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsContainerPresenter {
  // #filmsListTopRatedComponent = new FilmsListTopRatedView();
  // #filmsListMostCommentedComponent = new FilmsListMostCommentedView();

  #filmsContainer = null;
  #filmsModel = null;

  #sortingComponent = new SortingView();
  #filmsContainerView = new FilmsContainerView();
  #filmsListContainerElement = new FilmsListContainerView();
  #filmsListComponent = new FilmsListView();
  #noFilmsComponent = new NoFilmsView();
  #buttonShowMoreComponent = new ButtonShowMoreView();

  #filmsList = [];
  #sourcedFilms = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #popupPresenter = new Map();
  #filmPresenter = new Map();

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#sourcedFilms = [...this.#filmsModel.filmCards];
    this.#filmsList = [...this.#filmsModel.filmCards];
    this.#renderFilmsContainer();
  };

  #onFilmChange = (updatedFilm) => {
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    if (this.#popupPresenter.get(updatedFilm.id).state !== PopupState.HIDDEN) {
      this.#popupPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#filmsList.length <= this.#renderedFilmsCount) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.RATING:
        this.#filmsList.sort(sortFilmsByRating);
        break;
      case SortType.DATE:
        this.#filmsList.sort(sortFilmsByDate);
        break;
      default:
        this.#filmsList = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortingComponent, this.#filmsContainer);
    this.#sortingComponent.setSortTypeChangeHandler(this.#onSortTypeChange);
  };

  #onChangeState = () => {
    this.#popupPresenter.forEach((presenter) => presenter.closePopup());
  };

  #renderFilmCard = (filmCard) => {
    const popupPresenter = new PopupFilmDetailsPresenter(document.querySelector('body'), this.#onFilmChange, this.#onChangeState);
    const filmPresenter = new FilmCardPresenter(this.#filmsListContainerElement.element, this.#onFilmChange, () => popupPresenter.init(filmCard));

    filmPresenter.init(filmCard);
    this.#filmPresenter.set(filmCard.id, filmPresenter);
    this.#popupPresenter.set(filmCard.id, popupPresenter);
  };

  #renderFilms = (from, to) => {
    this.#filmsList.slice(from, to).forEach((filmCard) => this.#renderFilmCard(filmCard));
  };

  #renderFilmsList = () => {
    this.#filmsListComponent.element.appendChild(this.#filmsListContainerElement.element);
    this.#renderFilms(0, Math.min(this.#renderedFilmsCount, this.#filmsList.length));

    if (this.#filmsList.length > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }
  };

  #clearFilmsList = (isFilter = false) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    if (isFilter) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    }
    remove(this.#buttonShowMoreComponent);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmsListComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#onShowMoreButtonClick);
  };

  #renderFilmsContainer = () => {
    if (this.#filmsList.length){
      this.#renderSort();
    }
    render(this.#filmsContainerView, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsContainerView.element);

    if (!this.#filmsList.length) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsList();
  };
}

