import AbstractView from "./abstract.js";

const createNavItemTemplate = (nav, currentNavType) => {
  const {type, name, count} = nav;

  return (
    `<a href="#${name}" class="main-navigation__item ${type === currentNavType ? `main-navigation__item--active` : ``}" data-nav-type="${type}">${name} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

export const createMainNavigationTemplate = (navItems, currentNavType) => {
  const navItemsTemplate = navItems.map((nav) => createNavItemTemplate(nav, currentNavType)).join(``);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional ${currentNavType === `stats` ? `main-navigation__item--active` : ``}" data-nav-type="stats">Stats</a>
  </nav>`);
};

export default class MainNavigation extends AbstractView {
  constructor(navs, currentNavType) {
    super();
    this._navs = navs;
    this._currentNavType = currentNavType;
    this._navTypeChangeHandler = this._navTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._navs, this._currentNavType);
  }

  _navTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    const navItems = document.querySelectorAll(`A`);

    for (const navItem of navItems) {
      if (navItem.classList.contains(`main-navigation__item--active`)) {
        navItem.classList.remove(`main-navigation__item--active`);
      }
    }

    evt.target.classList.add(`main-navigation__item--active`);
    this._callback.navTypeChange(evt.target.dataset.navType);
  }

  setNavTypeChangeHandler(callback) {
    this._callback.navTypeChange = callback;
    this.getElement().addEventListener(`click`, this._navTypeChangeHandler);
  }
}
