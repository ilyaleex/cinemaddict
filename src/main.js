import {render, RenderPosition} from './render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import MovieAmountView from './view/movie-amount-view.js';
import SortingView from './view/sorting-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';
// import PopupFilmDetailsView from './view/popup-film-details-view.js';
import FilmCardModel from './model/film-card-model.js';
// import FilmCardPopupModel from './model/film-card-popup-model.js';
// import FilmCardPopupPresenter from './presenter/film-card-popup-presenter.js';
import PopupFilmDetailsView from './view/popup-film-details-view.js';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');
const filmsContainerPresenter = new FilmsContainerPresenter();
const filmCardModel = new FilmCardModel();
// const filmCardPopupModel = new FilmCardPopupModel();
// const filmsCardPopupPresenter = new FilmCardPopupPresenter();

render(new ProfileRatingView(), header);
render(new NavigationView(), main);
render(new SortingView(), main);
render(new MovieAmountView(), footerStatistics);
render(new PopupFilmDetailsView(), footer, RenderPosition.AFTEREND);

// render(new PopupFilmDetailsView(this.filmsCardPopup = this.filmsCardPopup.getFilmPopupCard()));

// filmsCardPopupPresenter.init(footer, RenderPosition.AFTEREND, filmCardPopupModel);
filmsContainerPresenter.init(main, filmCardModel);
