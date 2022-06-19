import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import {render, remove, replace} from '../framework/render.js';
import {PopupState, UpdateType, UserAction} from '../utils/const.js';
import CommentsView from '../view/comments-view.js';

export default class PopupFilmDetailsPresenter {
  #popupContainer = null;
  #popupComponent = null;
  #commentsComponent = null;
  #commentsContainer = null;

  #filmCard = null;
  #filmId = null;
  #prevFilmId = null;
  #comments = [];
  #commentsModel = null;

  #state = PopupState.HIDDEN;
  #changeData = null;

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

  init = async (filmCard, delCommentId = -1) => {
    if (this.#filmCard) {
      this.#prevFilmId = this.#filmCard.id;
    }

    this.#filmCard = filmCard;
    this.#filmId = filmCard.id;
    await this.#commentsModel.init(filmCard);
    this.#comments = this.#commentsModel.comments;

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupFilmDetailsView(this.#filmCard, this.#comments, delCommentId);

    this.#commentsContainer = this.#popupComponent.element.querySelector('.film-details__bottom-container');
    this.#commentsComponent = new CommentsView(this.#comments);

    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setClosePopupButtonHandler(this.#closePopup);
    this.#commentsComponent.setDeleteCommentButtonHandler(this.#handleDeleteComment);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.addEventListener('keydown', this.#handleAddComment);

    if (this.#state === PopupState.HIDDEN) {
      this.#popupContainer.classList.add('hide-overflow');
      render(this.#popupComponent, this.#popupContainer);
      render(this.#commentsComponent, this.#commentsContainer);
      this.#state = PopupState.OPEN;
      return;
    }

    render(this.#commentsComponent, this.#commentsContainer);
    replace(this.#popupComponent, prevPopupComponent);
    if (this.#prevFilmId === this.#filmCard.id) {
      this.#popupComponent.element.scrollTop = prevPopupComponent.scrollTopValue;
    }
  };

  setDeletingComment = (comments) => {
    this.#commentsComponent.updateElement(comments);
  };

  setPostingComment = () => {
    document.removeEventListener('keydown', this.#handleAddComment);
  };

  setAbortingDelete = (comments, index) => {
    const resetCommentsState = () => {
      comments[index].isDeleting = false;
      this.#commentsComponent.updateElement(comments);
    };
    this.#commentsComponent.shakeElement(this.#commentsComponent.element.querySelectorAll('.film-details__comment')[index], resetCommentsState);
  };

  setAbortingChange = () => {
    this.#popupComponent.shakeElement(this.#popupComponent.element.querySelector('.film-details__controls'));
  };

  setAbortingPost = () => {
    document.addEventListener('keydown', this.#handleAddComment);
    this.#popupComponent.shakeElement(this.#popupComponent.element.querySelector('.film-details__new-comment'));
  };

  #closePopup = () => {
    if (this.#state !== PopupState.HIDDEN) {
      this.#popupContainer.classList.remove('hide-overflow');
      remove(this.#popupComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      document.removeEventListener('keydown', this.#handleAddComment);
      this.#state = PopupState.HIDDEN;
    }
  };

  #handleDeleteComment = (target) => {
    const index = [...target.closest('.film-details__comments-list').children].findIndex((elem) => elem === target.closest('.film-details__comment'));
    this.#comments[index].isDeleting = true;
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        film: this.#filmCard,
        comments: this.#comments,
        index: index,
      }
    );
  };

  #handleAddComment = (evt) => {
    const commentTextElement = this.#popupComponent.element.querySelector('textarea');
    const commentEmojiElement = this.#popupComponent.element.querySelector('.film-details__emoji-item:checked');

    if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
      evt.preventDefault();

      if (commentTextElement.value && commentEmojiElement) {
        this.#changeData(
          UserAction.ADD_COMMENT,
          UpdateType.PATCH,
          {
            film: this.#filmCard,
            comment: {
              comment: commentTextElement.value,
              emotion: commentEmojiElement.value,
            }
          }
        );
        return;
      }

      if (!commentTextElement.value) {
        this.#popupComponent.shakeElement(commentTextElement);
      }

      if (!commentEmojiElement) {
        this.#popupComponent.shakeElement(this.#popupComponent.element.querySelector('.film-details__emoji-list'));
      }
    }
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

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };
}
