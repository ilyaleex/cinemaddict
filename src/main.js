import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import FilmCommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';

const AUTHORIZATION = 'Basic v857v99ndnwh43gf';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const main = document.querySelector('.main');
const filmsModel = new FilmCardModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filmCommentsModel = new FilmCommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filmsContainerPresenter = new FilmsContainerPresenter(main, filmsModel, filterModel, filmCommentsModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);

filterPresenter.init();
filmsContainerPresenter.init();
filmsModel.init();
