import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import FilmCardView from "../view/film-card";
import FilmFilmDetailsView from "../view/film-details";

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(siteFooterComponent, listContainerComponent, changeData, changeMode) {
    this._siteFooterComponent = siteFooterComponent;
    this._listContainerComponent = listContainerComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);


    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCrossClick = this._handleCrossClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleEmojiClick = this._handleEmojiClick.bind(this);

  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;
    const prevCardComponent = this._filmCardComponent;
    const prevDetailsComponent = this._filmDetailsComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmCardComponent.setCardClickHandler(this._handleCardClick);

    this._filmCardComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchlistCardClickHandler(this._handleWatchlistClick);

    if (prevCardComponent === null) {
      render(this._listContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevCardComponent) {
      replace(this._filmCardComponent, prevCardComponent);
      return;
    }

    if (this._mode === Mode.SHOW) {
      remove(this._filmDetailsComponent);
    }

    remove(prevCardComponent);
    remove(prevDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    // remove(this._filmDetailsComponent);
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


  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeCardDetails();
    }
  }

  _handleCrossClick() {
    this._removeCardDetails();
  }

  _handleCardClick() {
    this._showCardDetails();
  }

  _handleEmojiClick() {
    // console.log(`comments update`);
  }

  _removeCardDetails() {
    remove(this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _showCardDetails() {
    this._filmDetailsComponent = new FilmFilmDetailsView(this._film, this._comments);
    this._filmDetailsComponent.setClickHandler(this._handleCrossClick);

    this._filmDetailsComponent.setEmojiClickHandler(this._handleEmojiClick);


    render(this._siteFooterComponent, this._filmDetailsComponent, RenderPosition.AFTEREND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.SHOW;
  }
}
