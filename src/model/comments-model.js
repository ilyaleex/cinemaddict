import Observable from '../framework/observable.js';

export default class FilmCommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    try {
      const comments = await this.#commentsApiService.getComments(film);
      this.#comments = comments;
    } catch(err) {
      this.#comments = [];
    }
  };

  addComment = async (updateType, update) => {
    const {film, comment} = update;
    try {
      const response = await this.#commentsApiService.addComment(film, comment);
      this._notify(updateType, response);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, update) => {
    const {film, comments, index} = update;
    try {
      await this.#commentsApiService.deleteComment(comments[index]);
      film.comments.splice(index, 1);
      this._notify(updateType, film);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}

