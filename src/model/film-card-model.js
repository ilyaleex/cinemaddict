import Observable from '../framework/observable.js';
import {UpdateType} from '../utils/const.js';
import {convertToCamelCase} from '../utils/object-keys-converters.js';

export default class FilmCardModel extends Observable {
  #filmsApiService = null;
  #filmCards = [];

  constructor (filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get filmCards() {
    return this.#filmCards;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.filmCards;
      this.#filmCards = films.map(this.#adaptToClient);
    } catch(err) {
      this.#filmCards = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateFilmCard = async (updateType, update) => {
    const index = this.#filmCards.findIndex((filmCard) => filmCard.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#filmsApiService.updateFilmCard(update);
      const updatedFilmCard = this.#adaptToClient(response);
      this.#filmCards = [
        ...this.#filmCards.slice(0, index),
        updatedFilmCard,
        ...this.#filmCards.slice(index + 1),
      ];
      this._notify(updateType, updatedFilmCard);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  };

  #adaptToClient = (filmCard) => {
    const adaptedFilmCard = {...filmCard};

    convertToCamelCase(adaptedFilmCard);
    convertToCamelCase(adaptedFilmCard.filmInfo);
    convertToCamelCase(adaptedFilmCard.filmInfo.release);
    convertToCamelCase(adaptedFilmCard.userDetails);

    return adaptedFilmCard;
  };
}
