import ApiService from '../framework/api-service.js';
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
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      'film_info': {...film.filmInfo,
        'age_rating': film.filmInfo.ageRating,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        release: {
          date: film.filmInfo.release.date instanceof Date ? film.filmInfo.release.date.toISOString() : null,
          'release_country': film.filmInfo.release.releaseCountry
        }
      },
      'user_details': {...film.userDetails,
        'already_watched': film.userDetails.alreadyWatched,
        'watching_date': film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null
      }
    };

    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.user_details.alreadyWatched;
    delete adaptedFilm.user_details.watchingDate;

    return adaptedFilm;
  };
}
