import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import FilmDetailsView from "../view/film-details.js";

export default class FilmDetails {
  constructor(siteFooterComponent, changeData, changeMode) {
    this._siteFooterComponent = siteFooterComponent;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._handleCrossClick = this._handleCrossClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;
    this._filmDetailsComponent = new FilmDetailsView(this._film, this._comments);

    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setCrossClickHandler(this._handleCrossClick);
    this._filmDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);


    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    render(this._siteFooterComponent, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);

  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }

  _handleWatchedClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _handleWatchlistClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, {isWatchlist: !this._film.isWatchlist}));
  }

  _handleDeleteClick() {
    // console.log(`1111111`)


    // this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, Object.assign({}, this._comment, {isWatchlist: !this._film.isWatchlist}));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeCardDetails();
    }
  }

  _handleCrossClick() {
    this._removeCardDetails();
  }

  _removeCardDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
