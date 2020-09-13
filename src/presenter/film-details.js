import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmCardDetailsView from "../view/film-details.js";
import {UserAction, UpdateType} from "../const.js";

export default class FilmDetails {
  constructor(siteFooterComponent, changeData, changeMode, api) {
    this._siteFooterComponent = siteFooterComponent;
    this._filmDetailsComponent = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._api = api;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);

  }

  init(film, model) {
    this._film = film;
    this._commentsModel = model;
    const prevDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmCardDetailsView(this._film, this._commentsModel.getComments());

    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setHandleCommentSubmit(this._handleCommentSubmit);
    this._filmDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._filmDetailsComponent.setCrossClickHandler(this._handleCrossClick);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    if (prevDetailsComponent === null) {
      render(this._siteFooterComponent, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._escKeyDownHandler);
      return;
    }

    if (prevDetailsComponent) {
      replace(this._filmDetailsComponent, prevDetailsComponent);
      document.addEventListener(`keydown`, this._escKeyDownHandler);
      return;
    }

    remove(prevDetailsComponent);
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _handleFavoriteClick(data) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, data));
  }

  _handleWatchedClick(data) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, data));
  }

  _handleWatchlistClick(data) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, data));
  }

  _handleDeleteClick(comment) {
    this._commentsModel.deleteComment(UpdateType.MINOR, comment);
  }

  _handleCommentSubmit(comment) {
    this._commentsModel.addComment(UpdateType.MINOR, comment);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      this._changeMode();
    }
  }

  _handleCrossClick() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
  }
}
