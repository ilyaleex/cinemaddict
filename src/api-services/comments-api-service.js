import ApiService from '../framework/api-service.js';
import {ApiMethod} from '../utils/const.js';

export default class CommentsApiService extends ApiService {
  getComments = (film) => this._load({url: `comments/${film.id}`})
    .then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: ApiMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    const updatedComments = parsedResponse.comments.map((it) => it.id);
    film.comments = updatedComments;

    return film;
  };

  deleteComment = async (comment) =>
    await this._load({
      url: `comments/${comment.id}`,
      method: ApiMethod.DELETE,
    });
}
