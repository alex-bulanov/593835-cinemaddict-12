import {render, RenderPosition, remove} from "../utils/render.js";
import FilmCardView from "../view/film-card";
import FilmFilmDetailsView from "../view/film-details";

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(siteFooterComponent, listContainerComponent, changeMode) {
    this._siteFooterComponent = siteFooterComponent;
    this._listContainerComponent = listContainerComponent;
    this._changeMode = changeMode;


    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleCardClick = this._handleCardClick.bind(this);
    this.__handleClick = this._handleClick.bind(this);
    this._filmCardComponent = this._handleCardClick.bind(this);
    this._filmDetailsComponent = this._handleClick.bind(this);
    // this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmData, commentsArrayData) {
    this.film = filmData;
    this.commentsArrayData = commentsArrayData;

    const prevCardComponent = this._filmCardComponent;
    const prevDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(filmData);
    this._filmDetailsComponent = new FilmFilmDetailsView(filmData, commentsArrayData);

    this._filmCardComponent.setCardClickHandler(this._handleCardClick);
    this._filmDetailsComponent.setClickHandler(this._handleClick);


    if (prevCardComponent === null || prevDetailsComponent === null) {
      render(this._listContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
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
    remove(this._filmDetailsComponent);
  }

  // _escKeyDownHandler = (evt) => {
  //   if (evt.key === `Escape` || evt.key === `Esc`) {
  //     evt.preventDefault();
  //     remove(this._filmDetailsComponent);
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   }
  // };

  _handleClick() {
    // remove(this._filmDetailsComponent);
    // document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCardClick() {
    this._showCardDetails();
  }

  _showCardDetails() {
    render(this._siteFooterComponent, this._filmDetailsComponent, RenderPosition.AFTEREEND);
    // document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.SHOW;
    this._changeMode();
  }
}
