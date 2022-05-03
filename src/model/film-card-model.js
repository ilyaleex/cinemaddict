import {generateFilmCard} from '../mock/film-card.js';

export default class FilmCardModel {
  filmCards = Array.from({length: 12}, generateFilmCard);

  getFilmCards = () => this.filmCards;
}
