import {generateFilmCard, generateComments} from '../mock/film-card.js';

const QUANTITY = 12;

export default class FilmCardModel {
  filmCards = Array.from({length: QUANTITY}, generateFilmCard);
  comments = Array.from({length: QUANTITY}, generateComments);

  getFilmCards = () => this.filmCards;
  getComments = () => this.comments;
}
