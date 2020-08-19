import AbstractView from "./abstract.js";
import {NavType} from "../const.js";

const createMainNavigationTemplate = (data) => {
  const watchlistAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isWatchlist, 0) : 0;
  const historyAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isWatched, 0) : 0;
  const favoritesAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isFavorite, 0) : 0;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active" data-nav-type="${NavType.DEFAULT}">All movies</a>
        <a href="#watchlist" class="main-navigation__item" data-nav-type="${NavType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${watchlistAmount}</span></a>
        <a href="#history" class="main-navigation__item" data-nav-type="${NavType.HISTORY}">History <span class="main-navigation__item-count">${historyAmount}</span></a>
        <a href="#favorites" class="main-navigation__item" data-nav-type="${NavType.FAVORITES}">Favorites <span class="main-navigation__item-count">${favoritesAmount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(data) {
    super();
    this._data = data;

    this._navTypeChangeHandler = this._navTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._data);
  }

  _navTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();

    const navItems = document.querySelectorAll(`.main-navigation__item`);

    for (let navItem of navItems) {
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
