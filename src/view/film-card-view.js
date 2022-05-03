import {createElement} from '../render.js';
import {humanizeReleaseDate, humanizeRuntime, isActive} from '../utils.js';

const createFilmCardTemplate = (filmCard) => {
  const {
    title,
    totalRating,
    releaseDate,
    runtime,
    poster,
    description,
    watchList,
    alreadyWatched,
    favorite
  } = filmCard;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizeReleaseDate(releaseDate)}</span>
          <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
          <span class="film-card__genre">Western</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <span class="film-card__comments">89 comments</span>
      </a>
      <div class="film-card__controls">
        <button
          class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActive(watchList)}"
          type="button">Add to watchlist
        </button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActive(alreadyWatched)}" type="button">Mark as
          watched
        </button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isActive(favorite)}" type="button">Mark as favorite
        </button>
      </div>
    </article>`
  );
};

export default class FilmCardView {
  constructor(filmCard) {
    this.filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this.filmCard);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
