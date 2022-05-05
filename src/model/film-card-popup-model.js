import {generateFilmCard} from '../mock/film-card.js';

export default class FilmCardPopupModel {
  filmPopupCard = [generateFilmCard];

  getFilmPopupCard = () => this.filmPopupCard;
}
