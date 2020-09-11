import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {createCommentDataTemplate} from "../mocks/comment-mock";
import {UserAction, UpdateType} from "../const.js";
import DetailsPresenter from "./film-details.js";
import FilmCardView from "../view/film-card.js";
import CommentModel from "../model/comments.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(siteFooterComponent, listContainerComponent, changeData, changeMode) {
    this._listContainerComponent = listContainerComponent;
    this._siteFooterComponent = siteFooterComponent;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._commentsModel = new CommentModel();

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleCommentsEvent = this._handleCommentsEvent.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._isFirstInit = true;
  }

  init(film) {
    this._film = film;

    if (this._isFirstInit) {
      const commentsData = new Array(this._film.commentsCount).fill().map(createCommentDataTemplate);
      this._commentsModel.setComments(commentsData);
      this._isFirstInit = false;
    }

    this._commentsModel.addObserver(this._handleCommentsEvent);

    const prevCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setCardClickHandler(this._handleCardClick);

    if (prevCardComponent === null) {
      render(this._listContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevCardComponent) {
      replace(this._filmCardComponent, prevCardComponent);
      return;
    }

    remove(prevCardComponent);
  }

  resetView() {

    if (this._mode !== Mode.DEFAULT) {

      this._detailsPresenter.destroy();
      this._mode = Mode.DEFAULT;
    }
  }

  destroy() {
    remove(this._filmCardComponent);
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

  _handleCardClick() {
    this._mode = Mode.SHOW;
    this._showCardDetails();
  }

  _handleCommentsEvent() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {commentsCount: this._commentsModel.getComments().length}));
    this._detailsPresenter.init(this._film, this._commentsModel);
  }

  _showCardDetails() {
    this._detailsPresenter = new DetailsPresenter(this._siteFooterComponent, this._changeData, this._changeMode);
    this._detailsPresenter.init(this._film, this._commentsModel);
    this._filmDetailsComponent = this._detailsPresenter;
  }
}
