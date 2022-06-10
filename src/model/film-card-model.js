import {generateFilmCard} from '../mock/film-card.js';

export default class FilmCardModel {
  #filmCards = Array.from({length: 13}, generateFilmCard).map((filmCard, id) => {
    filmCard.id = ++id;
    return filmCard;
  });

  get filmCards() {
    return this.#filmCards;
  }
}

