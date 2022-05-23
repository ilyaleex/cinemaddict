import FilmCardView from '../view/film-card-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import {render, RenderPosition} from '../framework/render.js';

const footer = document.querySelector('.footer');
const body = document.querySelector('body');

export default class FilmCardPresenter {
  #filmsListContainerComponent = null;
  #filmCardComponent = null;
  #popupFilmDetailsComponent = null;
  #filmsModel = null;

  #filmCard = null;

  #comments = [];

  constructor(filmsListContainerComponent, filmsModel) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#filmsModel = filmsModel;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;

    this.#comments = [...this.#filmsModel.filmComments];
    this.#filmCardComponent = new FilmCardView(filmCard);
    this.#popupFilmDetailsComponent = new PopupFilmDetailsView(filmCard, this.#comments);

    this.#filmCardComponent.setOpenPopupHandler(this.#openPopupHandler);
    this.#popupFilmDetailsComponent.setClosePopupFilmDetailsHandler(this.#closePopupHandler);

    render(this.#filmCardComponent, this.#filmsListContainerComponent.element);
  };

  #addPopupFilmCard = () => {
    render(this.#popupFilmDetailsComponent, footer, RenderPosition.AFTEREND);
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #removePopupFilmCard = () => {
    body.removeChild(this.#popupFilmDetailsComponent.element);
    body.classList.remove('hide-overflow');
    body.removeAttribute('class');
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#removePopupFilmCard();
    }
  };

  #openPopupHandler = () => {
    this.#addPopupFilmCard();
  };

  #closePopupHandler = () => {
    this.#removePopupFilmCard();
  };
}
