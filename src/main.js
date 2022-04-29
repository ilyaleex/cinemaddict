import {render} from './render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import MovieAmountView from './view/movie-amount-view.js';
import SortingView from './view/sorting-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');
const filmsContainerPresenter = new FilmsContainerPresenter();

render(new ProfileRatingView(), header);
render(new NavigationView(), main);
render(new SortingView(), main);
render(new MovieAmountView(), footerStatistics);

filmsContainerPresenter.init(main);
