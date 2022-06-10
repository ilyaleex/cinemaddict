import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import {render, remove, replace} from '../framework/render.js';
import {PopupState} from '../utils/const.js';

export default class PopupFilmDetailsPresenter {
  #popupContainer = null;
  #popupComponent = null;
  #filmCard = null;
  #changeData = null;
  #changeState = null;

  #state = PopupState.HIDDEN;

  constructor(popupContainer, changeData, changeState) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#changeState = changeState;
  }

  get state() {
    return this.#state;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupFilmDetailsView(this.#filmCard);

    this.#popupComponent.setWatchlistClickHandler(this.#onWatchlistClick);
    this.#popupComponent.setHistoryClickHandler(this.#onHistoryClick);
    this.#popupComponent.setFavoriteClickHandler(this.#onFavoriteClick);
    this.#popupComponent.setClosePopupButtonHandler(this.closePopup);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    if (this.#state === PopupState.HIDDEN) {
      this.#changeState();
      this.#popupContainer.classList.add('hide-overflow');
      render(this.#popupComponent, this.#popupContainer);
      this.#state = PopupState.OPEN;
      return;
    }

    replace(this.#popupComponent, prevPopupComponent);
    this.#popupComponent.element.scrollTop = prevPopupComponent.scrollTopValue;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
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

  closePopup = () => {
    if (this.#state !== PopupState.HIDDEN) {
      this.#popupContainer.classList.remove('hide-overflow');
      remove(this.#popupComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#state = PopupState.HIDDEN;
    }
  };
}
