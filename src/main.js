import {render} from './render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import MovieAmountView from './view/movie-amount-view.js';
import SortingView from './view/sorting-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import FilmCardPopupModel from './model/film-card-popup-model.js';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');
const filmsContainerPresenter = new FilmsContainerPresenter();
const filmCardModel = new FilmCardModel();
const filmCardPopupModel = new FilmCardPopupModel();

render(new ProfileRatingView(), header);
render(new NavigationView(), main);
render(new SortingView(), main);
render(new MovieAmountView(), footerStatistics);


filmsContainerPresenter.init(main, filmCardModel, filmCardPopupModel);
