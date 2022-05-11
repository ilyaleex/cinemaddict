import {generateFilmCard, generateComments} from '../mock/film-card.js';

const FILMS_AMOUNT = 0;
const COMMENTS_AMOUNT = 3;

export default class FilmCardModel {
  #filmCards = Array.from({length: FILMS_AMOUNT}, generateFilmCard);
  #filmComments = Array.from({length: COMMENTS_AMOUNT}, generateComments);

  get filmCards() {
    return this.#filmCards;
  }

  get filmComments() {
    return this.#filmComments;
  }
}
