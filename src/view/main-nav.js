import AbstractView from "./abstract.js";

const createMainNavigationTemplate = (data) => {
  const watchlistAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isWatchlist, 0) : 0;
  const historyAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isWatched, 0) : 0;
  const favoritesAmount = (typeof data !== `undefined` && data !== null) ? data.reduce((prev, item) => prev + +item.isFavorite, 0) : 0;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistAmount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyAmount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesAmount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._data);
  }
}
