// import FilmCardView from '../view/film-card-view.js';
// import PopupFilmDetailsView from '../view/popup-film-details-view.js';
// import {render, RenderPosition} from '../framework/render.js'; //replace, remove,
//
// const footer = document.querySelector('.footer');
// const body = document.querySelector('body');
//
// export default class FilmCardPresenter {
//   #filmsListContainerComponent = null;
//   #filmCardComponent = null;
//   #popupFilmDetailsComponent = null;
//   // #filmsModel = null;
//   #filmCard = null;
//
//   #comments = [];
//
//   constructor(filmsListContainerComponent) {
//     this.#filmsListContainerComponent = filmsListContainerComponent;
//     // this.#filmsModel = filmsModel;
//   }
//
//   init = (filmCard) => {
//     this.#filmCard = filmCard;
//
//     this.#filmCardComponent = new FilmCardView(filmCard);
//     this.#popupFilmDetailsComponent = new PopupFilmDetailsView(filmCard, this.#comments);
//     // const prevFilmCardComponent = this.#filmCardComponent;
//     // const prevPopupFilmDetailsComponent = this.#popupFilmDetailsComponent;
//
//     this.#filmCardComponent.setOpenPopupHandler(this.#openPopupHandler);
//     this.#popupFilmDetailsComponent.setClosePopupFilmDetailsHandler(this.#closePopupHandler);
//
//     // if (prevFilmCardComponent === null || prevPopupFilmDetailsComponent === null) {
//     //   render(this.#filmCardComponent, this.#filmsListContainerComponent);
//     // }
//     //
//     // if (this.#filmsListContainerComponent.contains(prevFilmCardComponent.element)) {
//     //   replace(this.#filmCardComponent, prevFilmCardComponent);
//     // }
//     //
//     // if (this.#filmsListContainerComponent.contains(prevPopupFilmDetailsComponent.element)) {
//     //   replace(this.#popupFilmDetailsComponent, prevPopupFilmDetailsComponent);
//     // }
//     //
//     // remove(prevFilmCardComponent);
//     // remove(prevPopupFilmDetailsComponent);
//   };
//
//   // destroy = () => {
//   //   remove(this.#filmCardComponent);
//   //   remove(this.#popupFilmDetailsComponent);
//   // };
//
//   #addPopupFilmCard = () => {
//     render(this.#popupFilmDetailsComponent, footer, RenderPosition.AFTEREND);
//     body.classList.add('hide-overflow');
//     document.addEventListener('keydown', this.#escKeydownHandler);
//   };
//
//   #removePopupFilmCard = () => {
//     body.removeChild(this.#popupFilmDetailsComponent.element);
//     body.classList.remove('hide-overflow');
//     body.removeAttribute('class');
//     document.removeEventListener('keydown', this.#escKeydownHandler);
//   };
//
//   #escKeydownHandler = (evt) => {
//     if (evt.key === 'Esc' || evt.key === 'Escape') {
//       evt.preventDefault();
//       this.#removePopupFilmCard();
//     }
//   };
//
//   #openPopupHandler = () => {
//     this.#addPopupFilmCard();
//   };
//
//   #closePopupHandler = () => {
//     this.#removePopupFilmCard();
//   };
// }
