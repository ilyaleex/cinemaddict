import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import FilmCommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const main = document.querySelector('.main');
const filmCardModel = new FilmCardModel();
const filterModel = new FilterModel();
const filmCommentsModel = new FilmCommentsModel();
const filmsContainerPresenter = new FilmsContainerPresenter(main, filmCardModel, filterModel, filmCommentsModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmCardModel);

filterPresenter.init();

filmsContainerPresenter.init();
// const filmsModel = new FilmsModel();
// const filterModel = new FilterModel();
// const commentsModel = new CommentsModel();
// // const profilePresenter = new ProfilePresenter();
// const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
//
// const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
//
// filterPresenter.init();
//
// // profilePresenter.init(siteHeaderElement, getRandomProfileRating());
// boardPresenter.init();
