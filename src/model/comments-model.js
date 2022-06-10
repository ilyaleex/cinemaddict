import {generateComments} from '../mock/film-card.js';

export default class FilmCommentsModel {
  #filmComments = [];

  get filmComments() {
    for (let i = 1; i <= 10; i++) {
      this.#filmComments.push(generateComments(i));
    }
    return this.#filmComments;
  }
}
