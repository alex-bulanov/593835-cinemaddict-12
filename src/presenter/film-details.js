import {render, RenderPosition, remove} from "../utils/render.js";
// import {createCommentDataTemplate} from "../mocks/comment-mock";
import FilmCardDetailsView from "../view/film-details.js";
import {UserAction, UpdateType} from "../const.js";
// import CommentModel from "../model/comments.js";


export default class FilmDetails {
  constructor(siteFooterComponent, changeData, changeMode) {
    this._siteFooterComponent = siteFooterComponent;
    this._filmDetailsComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    // this._handleCommentsEvent = this._handleCommentsEvent.bind(this);


    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    // const commentsData = new Array(film.commentsCount).fill().map(createCommentDataTemplate);
    // this._commentsModel = new CommentModel();


    // this._commentsModel.setComments(commentsData);

    this._filmDetailsComponent = new FilmCardDetailsView(this._film, this._comments);

    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);

    // this._filmDetailsComponent.setHandleCommentSubmit(this._handleCommentSubmit);


    // this._filmDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);


    this._filmDetailsComponent.setCrossClickHandler(this._handleCrossClick);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    render(this._siteFooterComponent, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
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

  // _handleDeleteClick(comment) {
  _handleDeleteClick() {

    // this._film.commentsCount--;
    // this._commentsModel.deleteComment(UpdateType.MINOR, comment);

    // this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._film);
  }


  // _handleCommentSubmit(comment) {
  _handleCommentSubmit() {
    // this._film.commentsCount++;

    // this._commentsModel.addComment(UpdateType.MINOR, comment);
    // this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, this._film);
  }


  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleCrossClick() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
