import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import DetailsPresenter from "./film-details.js";
import FilmCardView from "../view/film-card.js";

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

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);

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
      this._filmDetailsComponent.destroy();
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
    this._changeMode();
    this._mode = Mode.SHOW;

    this._showCardDetails();
  }

  _showCardDetails() {
    const detailsPresenter = new DetailsPresenter(this._siteFooterComponent, this._changeData, this._changeMode);
    detailsPresenter.init(this._film);
    this._filmDetailsComponent = detailsPresenter;
  }
}
