import FilmCardView from '../view/film-card-view.js';
import {render, replace, remove,} from '../framework/render.js';

export default class FilmCardPresenter {
  #filmListContainer = null;
  #filmCardComponent = null;
  #changeData = null;
  #filmCard = null;
  #popupCallback = null;

  constructor (filmListContainer, changeData, popupCallback) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#popupCallback = popupCallback;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#filmCard);
    this.#filmCardComponent.setClickHandler(this.#popupCallback);
    this.#filmCardComponent.setWatchlistClickHandler(this.#onWatchlistClick);
    this.#filmCardComponent.setHistoryClickHandler(this.#onHistoryClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  #onWatchlistClick = () => {
    this.#filmCard.userDetails.watchlist = !this.#filmCard.userDetails.watchlist;
    this.#changeData(this.#filmCard);
  };

  #onHistoryClick = () => {
    this.#filmCard.userDetails.alreadyWatched = !this.#filmCard.userDetails.alreadyWatched;
    this.#changeData(this.#filmCard);
  };

  #onFavoriteClick = () => {
    this.#filmCard.userDetails.favorite = !this.#filmCard.userDetails.favorite;
    this.#changeData(this.#filmCard);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };
}

