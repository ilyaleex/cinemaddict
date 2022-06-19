import FilmCardView from '../view/film-card-view.js';
import {render, replace, remove,} from '../framework/render.js';
import {UpdateType, UserAction} from '../utils/const.js';

export default class FilmCardPresenter {
  #filmListContainer = null;
  #filmCardComponent = null;
  #changeData = null;
  #filmCard = null;
  #popupCallback = null;

  constructor(filmListContainer, changeData, popupCallback) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#popupCallback = popupCallback;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#filmCard);
    this.#filmCardComponent.setClickHandler(this.#popupCallback);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  setAbortingChange = () => {
    const elem = this.#filmCardComponent.element.querySelector('.film-card__controls');
    this.#filmCardComponent.shakeElement(elem);
  };

  #handleWatchlistClick = () => {
    this.#filmCard.userDetails.watchlist = !this.#filmCard.userDetails.watchlist;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        film: this.#filmCard,
        presenter: this,
      }
    );
  };

  #handleHistoryClick = () => {
    this.#filmCard.userDetails.alreadyWatched = !this.#filmCard.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        film: this.#filmCard,
        presenter: this,
      }
    );
  };

  #handleFavoriteClick = () => {
    this.#filmCard.userDetails.favorite = !this.#filmCard.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        film: this.#filmCard,
        presenter: this,
      }
    );
  };
}

