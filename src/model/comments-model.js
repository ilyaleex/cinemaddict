import {generateComments} from '../mock/film-card.js';
import Observable from '../framework/observable.js';

const newComments = () => {
  const comments = [];
  for (let i = 1; i <= 10; i++) {
    comments.push(generateComments(i));
  }
  return comments;
};

export default class FilmCommentsModel extends Observable {
  #comments = newComments();

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    const {film, comment} = update;
    comment.id = this.#comments.length + 1;
    this.#comments.push(comment);
    film.comments.push(comment.id);

    this._notify(updateType, film);
  };

  deleteComment = (updateType, update) => {
    this._notify(updateType, update);
  };
}

