import AbstractView from '../framework/view/abstract-view.js';
import {humanizeRuntime, isActiveButtonPopup, normalizeFilmDate} from '../utils/film-card.js';

const createPopupFilmDetailsTemplate = (filmCard, allComments) => {
  const {
    filmInfo : {
      title,
      alternativeTitle,
      totalRating,
      poster,
      runtime,
      genre,
      description,
      release,
      director,
      writers,
      actors,
      ageRating,
    },
    userDetails: {
      watchList,
      alreadyWatched,
      favorite,
    },
    comments
  } = filmCard;

  const filmComments = allComments.filter(({commentId}) => comments.some((filmId) => commentId === filmId));

  const createComments = ({author, comment, commentDate, emotion}) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${normalizeFilmDate(commentDate, 'comment-date')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );

  const createGenre = (genreItem) => (
    `<span class="film-details__genre">${genreItem}</span>`
  );

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">${director}</td>
                  <td class="film-details__cell">Anthony Mann</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${normalizeFilmDate(release.date, 'release-date')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizeRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">USA</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genre.map(createGenre).join('')}
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isActiveButtonPopup(watchList)}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${isActiveButtonPopup(alreadyWatched)}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${isActiveButtonPopup(favorite)}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${filmComments.map(createComments).join('')}
            </ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupFilmDetailsView extends AbstractView {
  #filmCard = null;
  #filmComments = null;

  constructor(filmCard, filmComments) {
    super();
    this.#filmCard = filmCard;
    this.#filmComments = filmComments;
  }

  get template() {
    return createPopupFilmDetailsTemplate(this.#filmCard, this.#filmComments);
  }

  setClosePopupFilmDetailsHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupFilmDetailsHandler);
  };

  #closePopupFilmDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}

