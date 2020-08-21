import {COMMENTS_COUNT} from "../const.js";
import {GENRES_COUNT} from "../const.js";

import Abstract from "./abstract.js";

const createFilmCardTemplate = (film = {}) => {
  const {
    title = ``,
    poster = ``,
    description = ``,
    rating = ``,
    dateOfProduction = ``,
    runtime = ``,
    genres = ``,
    commentsCount = ``,
    isWatchlist = ``,
    isWatched = ``,
    isFavorite = ``
  } = film;

  const watchlistClassName = isWatchlist ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active` : `film-card__controls-item--add-to-watchlist`;
  const watchedClassName = isWatched ? `film-card__controls-item--mark-as-watched film-card__controls-item--active` : `film-card__controls-item--mark-as-watched`;
  const favoriteClassName = isFavorite ? `film-card__controls-item--favorite film-card__controls-item--active` : `film-card__controls-item--favorite`;
  // ограничиваем длинну описания
  const filmCardDescription = description.length < 140 ? description : description.slice(0, 139) + `...`;
  // если в списке жанром не один элемент, то просто беру первый
  const genresCurrentValue = genres > GENRES_COUNT ? GENRES_COUNT : genres;

  let commentsCurrentValue = commentsCount > COMMENTS_COUNT ? COMMENTS_COUNT : commentsCount;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dateOfProduction}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genresCurrentValue}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${filmCardDescription}</p>
      <a class="film-card__comments">${commentsCurrentValue} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button ${watchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this.film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.favoriteClick();
  }

  setFavoriteCardClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setCardClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}
