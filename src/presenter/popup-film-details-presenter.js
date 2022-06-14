import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import {render, remove, replace} from '../framework/render.js';
import {PopupState, UpdateType, UserAction} from '../utils/const.js';

export default class PopupFilmDetailsPresenter {
  #popupContainer = null;
  #popupComponent = null;
  #changeData = null;

  #filmCard = null;
  #filmId = null;
  #prevFilmId = null;
  #comments = null;
  #commentsModel = null;

  #state = PopupState.HIDDEN;

  constructor(popupContainer, changeData, commentsModel) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
  }

  get state() {
    return this.#state;
  }

  get filmId() {
    return this.#filmId;
  }

  init = (filmCard) => {
    if (this.#filmCard) {
      this.#prevFilmId = this.#filmCard.id;
    }

    this.#filmCard = filmCard;
    this.#filmId = filmCard.id;
    this.#comments = this.#commentsModel.comments;

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupFilmDetailsView(this.#filmCard, this.#comments);

    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setClosePopupButtonHandler(this.#closePopup);
    this.#popupComponent.setDeleteCommentButtonHandler(this.#deleteComment);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.addEventListener('keydown', this.#addComment);

    if (this.#state === PopupState.HIDDEN) {
      this.#popupContainer.classList.add('hide-overflow');
      render(this.#popupComponent, this.#popupContainer);
      this.#state = PopupState.OPEN;
      return;
    }

    replace(this.#popupComponent, prevPopupComponent);
    if (this.#prevFilmId === this.#filmCard.id) {
      this.#popupComponent.element.scrollTop = prevPopupComponent.scrollTopValue;
    }
  };

  #deleteComment = (target) => {
    const index = [...target.closest('.film-details__comments-list').children].findIndex((elem) => elem === target.closest('.film-details__comment'));

    this.#filmCard.comments.splice(index, 1);
    target.closest('.film-details__comment').remove();

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      this.#filmCard
    );
  };

  #addComment = (evt) => {
    const commentText = this.#popupComponent.element.querySelector('textarea');
    const commentEmoji = this.#popupComponent.element.querySelector('.film-details__emoji-item:checked');

    if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
      evt.preventDefault();

      if (commentText.value && commentEmoji) {
        this.#changeData(
          UserAction.ADD_COMMENT,
          UpdateType.PATCH,
          {
            film: this.#filmCard,
            comment: {
              id: -1,
              author: 'Author',
              comment: commentText.value,
              date: new Date(),
              emotion: commentEmoji.value,
            }
          }
        );
      }
    }
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleWatchlistClick = () => {
    this.#filmCard.userDetails.watchlist = !this.#filmCard.userDetails.watchlist;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      this.#filmCard
    );
  };

  #handleHistoryClick = () => {
    this.#filmCard.userDetails.alreadyWatched = !this.#filmCard.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      this.#filmCard
    );
  };

  #handleFavoriteClick = () => {
    this.#filmCard.userDetails.favorite = !this.#filmCard.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      this.#filmCard
    );
  };

  #closePopup = () => {
    if (this.#state !== PopupState.HIDDEN) {
      this.#popupContainer.classList.remove('hide-overflow');
      remove(this.#popupComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#state = PopupState.HIDDEN;
    }
  };
}
