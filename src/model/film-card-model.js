import Observable from '../framework/observable.js';
import {UpdateType} from '../utils/const.js';

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

  #adaptToClient = (film) => {
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      filmInfo: {...film.film_info,
        ageRating: film.film_info.age_rating,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        release: {
          date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          releaseCountry: film.film_info.release.release_country
        }
      },
      userDetails: {...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
      }
    };

    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}
