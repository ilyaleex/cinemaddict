import {render, RenderPosition} from '../render.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import NoMoviesView from '../view/no-movies-view.js';

const FILMS_COUNT_PER_STEP = 5;

const footer = document.querySelector('.footer');
const body = document.querySelector('body');

export default class FilmsContainerPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #buttonShowMoreComponent = new ButtonShowMoreView();

  #filmsList = [];
  #comments = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmsList = [...this.#filmsModel.filmCards];
    this.#comments = [...this.#filmsModel.filmComments];
    this.#renderFilmsContainer();
  };

  #renderFilmsContainer = () => {
    render(this.#filmsContainerComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsContainerComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    render(this.#filmsListTopRatedComponent, this.#filmsContainerComponent.element);
    render(this.#filmsListMostCommentedComponent, this.#filmsContainerComponent.element);

    // if (this.#filmsList === null) {
    //   render(new NoMoviesView(), this.#filmsListComponent);
    // }

    for (let i = 0; i < Math.min(this.#filmsList.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilmCard(this.#filmsList[i]);
    }

    if (this.#filmsList.length > FILMS_COUNT_PER_STEP) {
      render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);

      this.#buttonShowMoreComponent.element.addEventListener('click', this.#handleButtonShowMoreClick);
    }
  };

  #handleButtonShowMoreClick = (evt) => {
    evt.preventDefault();
    this.#filmsList
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((filmCard) => this.#renderFilmCard(filmCard));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsList.length) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.element.removeElement();
    }
  };

  #renderFilmCard = (filmCard) => {
    const filmCardComponent = new FilmCardView(filmCard);
    const popupFilmDetailsComponent = new PopupFilmDetailsView(filmCard, this.#comments);

    render(filmCardComponent, this.#filmsListContainerComponent.element);

    const addPopupFilmCard = () => {
      render(popupFilmDetailsComponent, footer, RenderPosition.AFTEREND);
      body.classList.add('hide-overflow');
    };

    const removePopupFilmCard = () => {
      body.removeChild(popupFilmDetailsComponent.element);
      body.classList.remove('hide-overflow');
      body.removeAttribute('class');
    };

    const onEscKeydown = (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        evt.preventDefault();
        removePopupFilmCard();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    filmCardComponent.element.querySelector('.film-card__comments').addEventListener('click', () => {
      addPopupFilmCard();
      document.addEventListener('keydown', onEscKeydown);
    });

    popupFilmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      removePopupFilmCard();
      onEscKeydown();
    });
  };
}

