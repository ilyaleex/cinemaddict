import AbstractView from '../framework/view/abstract-view.js';
import {humanizeRuntime, normalizeFilmDate, isActiveButton} from '../utils/film-card.js';

const createFilmCardTemplate = (filmCard) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      runtime,
      genre,
      description,
      release,
    },
    userDetails: {
      watchList,
      alreadyWatched,
      favorite,
    },
    comments
  } = filmCard;

  const date = release.date !== null ? normalizeFilmDate(release.date, 'preview-date') : '';

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date}</span>
          <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
          <span class="film-card__genre">${genre.join(', ')}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActiveButton(watchList)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActiveButton(alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isActiveButton(favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #filmCard = null;

  constructor(filmCard) {
    super();
    this.#filmCard = filmCard;
  }

  get template() {
    return createFilmCardTemplate(this.#filmCard);
  }

  setOpenPopupHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.film-card__comments')
      .addEventListener('click', this.#openPopupHandler);
  };

  #openPopupHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
