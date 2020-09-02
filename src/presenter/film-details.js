import {render, RenderPosition, remove} from "../utils/render.js";
import {createCommentDataTemplate} from "../mocks/comment-mock";
import FilmCardDetailsView from "../view/film-details.js";
import {UserAction, UpdateType} from "../const.js";
import CommentModel from "../model/comments.js";

export default class FilmDetails {
  constructor(siteFooterComponent, changeData, changeMode) {
    this._siteFooterComponent = siteFooterComponent;
    this._filmDetailsComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCommentsEvent = this._handleCommentsEvent.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);
  }

  init(film) {
    this._film = film;
    const commentsData = new Array(film.commentsCount).fill().map(createCommentDataTemplate);
    this._commentsModel = new CommentModel();

    this._commentsModel.setComments(commentsData);
    this._commentsModel.addObserver(this._handleCommentsEvent);

    this._filmDetailsComponent = new FilmCardDetailsView(this._film, this._commentsModel.getComments());

    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._filmDetailsComponent.setCrossClickHandler(this._handleCrossClick);
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

  _handleDeleteClick(comment) {
    this._film.commentsCount--;
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._film);

    this._commentsModel.deleteComment(UpdateType.MINOR, comment);
  }

  _handleCommentsEvent() {
    const comments = this._commentsModel.getComments();
    this._filmDetailsComponent.updateData({comments});
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
