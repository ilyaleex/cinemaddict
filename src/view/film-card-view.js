import {createElement} from '../render.js';
import {humanizeRuntime, normalizeFilmDate} from '../utils.js';

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
    // userDetails: {
    //   watchList,
    //   alreadyWatched,
    //   favorite,
    // },
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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
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
