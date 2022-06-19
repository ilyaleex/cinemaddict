import {EMOTIONS} from '../utils/const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import he from 'he';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

const createPopupTemplate = (data) => {
  const comments = Object.values(data);

  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : ''}</span></h3>
    <ul class="film-details__comments-list">
      ${!comments ? '' : comments.map((comment) => `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${dayjs().to(comment.date)}</span>
              <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled' : ''}>${comment.isDeleting ? 'Deleting...' : 'Delete'}</button>
            </p>
          </div>
        </li>`).join('')}
    </ul>
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        <img class="visually-hidden" src="" width="55" height="55">
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
        ${EMOTIONS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
          <label class="film-details__emoji-label" for="emoji-${emoji}">
            <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
          </label>`).join('')}
      </div>
    </div>
  </section>`);
};

export default class CommentsView extends AbstractStatefulView {
  constructor(comments) {
    super();
    this._state = comments;
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  shakeElement = (element, callback) => {
    element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiChangeHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setDeleteCommentButtonHandler(this._callback.deleteComment);
  };

  setDeleteCommentButtonHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#deleteCommentButtonHandler);
  };

  #deleteCommentButtonHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    evt.preventDefault();
    this._callback.deleteComment(evt.target);
  };

  #emojiChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL' && evt.target.tagName !== 'IMG') {
      return;
    }

    const commentEmoji = this.element.querySelector('.film-details__add-emoji-label img');
    commentEmoji.src = evt.target.tagName === 'IMG' ? evt.target.src : evt.target.firstElementChild.src;
    commentEmoji.alt = evt.target.tagName === 'IMG' ? evt.target.alt : evt.target.firstElementChild.alt;
    commentEmoji.classList.remove('visually-hidden');
  };
}
