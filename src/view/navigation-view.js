import AbstractView from '../framework/view/abstract-view.js';

const createNavigationItemsTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createNavigationTemplate = (navigationItems) => {
  const navigationItemsTemplate = navigationItems
    .map((filter, index) => createNavigationItemsTemplate(filter, index === 0))
    .join('');

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${navigationItemsTemplate}
    </nav>`
  );
};

export default class NavigationView extends AbstractView {
  #navigationItems = null;

  constructor(navigationItems) {
    super();
    this.#navigationItems = navigationItems;
  }

  get template() {
    return createNavigationTemplate(this.#navigationItems);
  }
}
