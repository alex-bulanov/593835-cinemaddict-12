import {formatRunTime, formatDateOfProduction} from "../utils/film.js";
import SmartView from "./smart.js";

const createFilmCardTemplate = (film = {}) => {
  const {
    title = ``,
    poster = ``,
    description = ``,
    rating = ``,
    dateOfProduction = ``,
    runtime = ``,
    genre = ``,
    commentsCount = ``,
    isWatchlist = ``,
    isWatched = ``,
    isFavorite = ``
  } = film;

  const dateOfProductionTemplate = formatDateOfProduction(dateOfProduction);

  const watchlistClassName = isWatchlist ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active` : `film-card__controls-item--add-to-watchlist`;
  const watchedClassName = isWatched ? `film-card__controls-item--mark-as-watched film-card__controls-item--active` : `film-card__controls-item--mark-as-watched`;
  const favoriteClassName = isFavorite ? `film-card__controls-item--favorite film-card__controls-item--active` : `film-card__controls-item--favorite`;
  const filmCardDescription = description.length < 140 ? description : description.slice(0, 139) + `...`;

  const commentsCurrentValue = commentsCount;
  const filmRunTime = formatRunTime(runtime);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dateOfProductionTemplate}</span>
        <span class="film-card__duration">${filmRunTime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${filmCardDescription}</p>
      <a class="film-card__comments">${commentsCurrentValue} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button ${watchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.favoriteClick();
    this.updateData({isFavorite: !this._film.isFavorite}, true);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._film.watchingDate = this._film.watchingDate ? null : this._film.watchingDate = new Date();
    this._callback.watchedClick();
    this.updateData({isWatched: !this._film.isWatched, watchingDate: this._film.watchingDate}, true);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.watchlistClick();
    this.updateData({isWatchlist: !this._film.isWatchlist}, true);
  }

  setFavoriteCardClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedCardClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistCardClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setCardClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}
