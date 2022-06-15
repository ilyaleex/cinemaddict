import ApiService from '../framework/api-service.js';
import {convertToSnakeCase} from '../utils/object-keys-converters.js';
import {ApiMethod} from '../utils/const.js';

export default class FilmsApiService extends ApiService {
  get filmCards() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilmCard = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {...film};
    convertToSnakeCase(adaptedFilm);
    convertToSnakeCase(adaptedFilm.film_info);
    convertToSnakeCase(adaptedFilm.film_info.release);
    convertToSnakeCase(adaptedFilm.user_details);

    return adaptedFilm;
  };
}
