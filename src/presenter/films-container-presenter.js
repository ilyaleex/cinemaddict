import {render, remove, RenderPosition} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import SortingView from '../view/sorting-view.js';
import PopupFilmDetailsPresenter from './popup-film-details-presenter.js';
import {ExtraFilmTitle, FilterType, PopupState, SortingType, UpdateType, UserAction} from '../utils/const.js';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/sorting.js';
import {filter} from '../utils/filter.js';
import {sortFilmsByCommentsAmount} from '../utils/common.js';
import ProfileRatingView from '../view/profile-rating-view.js';
import FilmsTotalView from '../view/films-total-view.js';

const FILMS_COUNT_PER_STEP = 5;
const FILMS_LIST_EXTRA_AMOUNT = 2;

export default class FilmsContainerPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;

  #profileComponent = null;
  #sortingComponent = null;
  #showMoreButtonComponent = null;
  #noFilmsComponent = null;
  #filmsComponent = new FilmsView();
  #filmsTotalComponent = null;

  #isExtraFilmsList = true;
  #mainFilmsListComponent = new FilmsListView();
  #topRatedFilmsListComponent = new FilmsListView(this.#isExtraFilmsList, ExtraFilmTitle.TOP_RATED);
  #topCommentedFilmsListComponent = new FilmsListView(this.#isExtraFilmsList, ExtraFilmTitle.MOST_COMMENTED);

  #popupContainer = document.querySelector('body');
  #profileContainer = document.querySelector('.header');
  #filmsTotalContainer = document.querySelector('.footer__statistics');

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #currentSortingType = SortingType.DEFAULT;
  #currentFilterType = FilterType.ALL;
  #popupPresenter = null;
  #mainFilmPresenter = new Map();
  #topRatedFilmPresenter = new Map();
  #topCommentedFilmPresenter = new Map();

  constructor(filmsContainer, filmsModel, filterModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;

    this.#popupPresenter = new PopupFilmDetailsPresenter(
      this.#popupContainer,
      this.#handleViewAction,
      this.#commentsModel
    );

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#currentFilterType = this.#filterModel.filter;
    const films = this.#filmsModel.filmCards;
    const filteredFilms = filter[this.#currentFilterType](films);

    switch (this.#currentSortingType) {
      case SortingType.RATING:
        return filteredFilms.sort(sortFilmsByRating);
      case SortingType.DATE:
        return filteredFilms.sort(sortFilmsByDate);
    }
    return filteredFilms;
  }

  init = () => {
    this.#renderProfile();
    this.#renderContainer();
    this.#renderExtraFilms();
    this.#renderFilmsTotal();
  };

  #handleViewAction = (userAction, updateType, update) => {
    switch (userAction) {
      case UserAction.UPDATE_FILM_CARD:
        this.#filmsModel.updateFilmCard(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilmCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#renderProfile();
        this.#updateFilmData(data);
        break;
      case UpdateType.MINOR:
        this.#renderProfile();
        this.#clearContainer();
        this.#renderContainer();
        this.#updateFilmData(data);
        break;
      case UpdateType.MAJOR:
        this.#renderProfile();
        this.#clearContainer({resetRenderedFilmsCount: true});
        this.#renderContainer();
        break;
    }
  };

  #handleShowMoreButtonClick = () => {
    const filmsAmount = this.films.length;
    const currentRenderFilmsAmount = Math.min(filmsAmount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, currentRenderFilmsAmount);

    this.#renderFilmsList(films);
    this.#renderedFilmsCount = currentRenderFilmsAmount;

    if (filmsAmount <= this.#renderedFilmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderProfile = () => {
    if (this.#profileComponent) {
      remove(this.#profileComponent);
    }
    this.#profileComponent = new ProfileRatingView(this.films);
    render(this.#profileComponent, this.#profileContainer);
  };

  #renderFilmsTotal = () => {
    this.#filmsTotalComponent = new FilmsTotalView(this.films);
    render(this.#filmsTotalComponent, this.#filmsTotalContainer);
  };

  #updateFilmData = (film) => {
    if (this.#mainFilmPresenter.get(film.id)){
      this.#mainFilmPresenter.get(film.id).init(film);
    }
    if (this.#popupPresenter.state === PopupState.OPEN && film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.init(film);
    }
    if (this.#topRatedFilmPresenter.get(film.id) || this.#topCommentedFilmPresenter.get(film.id)){
      this.#renderExtraFilms();
    }
  };

  #handleSortingTypeChange = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }
    this.#currentSortingType = sortingType;
    this.#clearContainer({resetRenderedFilmsCount: true});
    this.#renderContainer();
  };

  #renderSorting = () => {
    this.#sortingComponent = new SortingView(this.#currentSortingType);
    this.#sortingComponent.setSortingTypeChangeHandler(this.#handleSortingTypeChange);
    render(this.#sortingComponent, this.#filmsContainer);
  };

  #renderPopup = (film) => {
    this.#popupPresenter.init(film);
  };

  #renderFilmCard = (film, filmsListContainer, filmPresenterMap) => {
    const filmPresenter = new FilmCardPresenter(
      filmsListContainer,
      this.#handleViewAction,
      () => this.#renderPopup(film)
    );

    filmPresenter.init(film);
    filmPresenterMap.set(film.id, filmPresenter);
  };

  #renderFilms = (films, filmsListComponent, filmPresenterMap) => {
    films.forEach((film) => this.#renderFilmCard(film, filmsListComponent, filmPresenterMap));
  };

  #renderFilmsList = (
    films,
    filmsListComponent = this.#mainFilmsListComponent,
    filmPresenterMap = this.#mainFilmPresenter,
    renderPosition = RenderPosition.AFTERBEGIN
  ) => {
    const filmsListContainer = filmsListComponent.element.querySelector('.films-list__container');
    render(filmsListComponent, this.#filmsComponent.element, renderPosition);
    this.#renderFilms(films, filmsListContainer, filmPresenterMap);
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#currentFilterType);
    render(this.#noFilmsComponent, this.#mainFilmsListComponent.element);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ButtonShowMoreView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#mainFilmsListComponent.element);
  };

  #clearFilmPresenter = (filmPresenter) => {
    filmPresenter.forEach((presenter) => presenter.destroy());
    filmPresenter.clear();
  };

  #renderExtraFilms = () => {
    const topRatedFilms = [...this.films].sort(sortFilmsByRating);
    const topCommentedFilms = [...this.films].sort(sortFilmsByCommentsAmount);

    if (topRatedFilms.some((film) => film.filmInfo.totalRating)){
      this.#clearFilmPresenter(this.#topRatedFilmPresenter);

      this.#renderFilmsList(
        topRatedFilms.slice(0, FILMS_LIST_EXTRA_AMOUNT),
        this.#topRatedFilmsListComponent,
        this.#topRatedFilmPresenter,
        RenderPosition.BEFOREEND
      );
    }

    if (topCommentedFilms.some((film) => film.comments.length)) {
      this.#clearFilmPresenter(this.#topCommentedFilmPresenter);

      this.#renderFilmsList(
        topCommentedFilms.slice(0, FILMS_LIST_EXTRA_AMOUNT),
        this.#topCommentedFilmsListComponent,
        this.#topCommentedFilmPresenter,
        RenderPosition.BEFOREEND
      );
    }
  };

  #renderContainer = () => {
    const films = this.films;
    const filmsAmount = this.films.length;

    if (this.films.length){
      this.#renderSorting();
    }

    render(this.#filmsComponent, this.#filmsContainer);

    if (!this.films.length) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsList(
      films.slice(0, Math.min(filmsAmount, this.#renderedFilmsCount)),
      this.#mainFilmsListComponent,
      this.#mainFilmPresenter
    );

    if (filmsAmount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }
  };

  #clearContainer = ({resetRenderedFilmsCount = false} = {}) => {
    this.#clearFilmPresenter(this.#mainFilmPresenter);

    remove(this.#sortingComponent);
    remove(this.#showMoreButtonComponent);
    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    }
  };
}
