import {render} from './framework/render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import MovieAmountView from './view/movie-amount-view.js';
import SortingView from './view/sorting-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import {generateFilter} from './mock/filter.js';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');
const filmCardModel = new FilmCardModel();
const filmsContainerPresenter = new FilmsContainerPresenter(main, filmCardModel);

const filters = generateFilter(filmCardModel.filmCards);

render(new ProfileRatingView(), header);
render(new NavigationView(filters), main);
render(new SortingView(), main);
render(new MovieAmountView(), footerStatistics);


filmsContainerPresenter.init();
