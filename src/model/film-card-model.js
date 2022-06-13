import {generateFilmCard} from '../mock/film-card.js';
import Observable from '../framework/observable.js';

export default class FilmCardModel extends Observable {
  #filmCards = Array.from({length: 13}, generateFilmCard).map((filmCard, id) => {
    filmCard.id = ++id;
    return filmCard;
  });

  get filmCards() {
    return this.#filmCards;
  }

  updateFilmCard = (updateType, update) => {
    const index = this.#filmCards.findIndex((filmCard) => filmCard.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#filmCards = [
      ...this.#filmCards.slice(0, index),
      update,
      ...this.#filmCards.slice(index + 1)
    ];

    this._notify(updateType, update);
  };
}
