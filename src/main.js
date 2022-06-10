import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import FilmsAmountView from './view/films-amount-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import ProfileRatingPresenter from './presenter/profile-rating-presenter.js';
import {getRandomProfileRating} from './mock/profile-rating.js';

const profileRating = getRandomProfileRating();

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');
const profileRatingPresenter = new ProfileRatingPresenter();
const filmCardModel = new FilmCardModel();
const filmsContainerPresenter = new FilmsContainerPresenter(main, filmCardModel);

render(new FilterView(filmCardModel.filmCards), main);
render(new FilmsAmountView(), footerStatistics);

profileRatingPresenter.init(header, profileRating);
filmsContainerPresenter.init();
