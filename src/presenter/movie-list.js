import {SortType} from "../const.js";
import FilmsSectionView from "../view/films-section.js";
import NoFilmsDataView from "../view/no-films.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card";
import FilmFilmDetailsView from "../view/film-details";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListExtraSectionView from "../view/film-extra.js";

import FilmsListContainerView from "../view/films-list-container.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const CARDS_AMOUNT_PER_STEP = 5;
const CARDS_EXTRA_AMOUNT = 2;

export default class MovieList {
  constructor(movieListContainer, siteFooterElement) {

    this._movieListContainer = movieListContainer;
    this._siteFooterComponent = siteFooterElement;

    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmsSectionComponent = new FilmsSectionView();
    this._noFilmsSectionComponent = new NoFilmsDataView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);


  }

  init(dataFilmsArray, dataCommentsArray) {

    render(this._movieListContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);

    if (!dataFilmsArray) {
      this._renderNoFilms();
      return;
    }

    this._dataFilmsArray = dataFilmsArray.slice();
    this._dataCommentsArray = dataCommentsArray.slice();
    this._currentFilmsArray = dataFilmsArray.slice();


    this._renderMainContent();
  }


  _handleShowMoreButtonClick() {
    this._renderCards(this._renderCardsCount, this._renderCardsCount + CARDS_AMOUNT_PER_STEP, this._currentFilmsArray, this._filmsListContainerComponent);
    this._renderCardsCount += CARDS_AMOUNT_PER_STEP;


    if (this._renderCardsCount >= this._dataFilmsArray.length) {
      remove(this._showMoreButtonComponent);
    }

  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderNoFilms() {
    render(this._filmsSectionComponent, this._noFilmsSectionComponent, RenderPosition.BEFOREEND);
  }


  _renderCard(dataFilm, listContainerComponent) {
    const filmCardComponent = new FilmCardView(dataFilm);

    render(listContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);

    filmCardComponent.setHandler(() => {
      // вешаю слушатель клика по постеру
      const filmDetailsComponent = new FilmFilmDetailsView(dataFilm, this._dataCommentsArray);
      render(this._siteFooterComponent, filmDetailsComponent, RenderPosition.AFTEREEND);

      this.filmDetailsComponent = filmDetailsComponent;

      document.addEventListener(`keydown`, onEscKeyDown);

      this.filmDetailsComponent.setHandler(() => {
        remove(this.filmDetailsComponent);
      });
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(this.filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  _renderCards(from, to, currentFilmsArray, place) {
    currentFilmsArray
      .slice(from, to)
      .forEach((dataFilm) => this._renderCard(dataFilm, place));
  }

  _renderExtra() {

    const extraSectionTopRatingComponent = new FilmsListExtraSectionView(`Top rated`);
    render(this._filmsSectionComponent, extraSectionTopRatingComponent, RenderPosition.BEFOREEND);
    const filmsListTopRatingContainerComponent = new FilmsListContainerView();
    render(extraSectionTopRatingComponent, filmsListTopRatingContainerComponent, RenderPosition.BEFOREEND);

    // сортируем по рейтингу
    let dataArrayRating = this._currentFilmsArray.slice();
    dataArrayRating = dataArrayRating.sort((a, b) => a.rating < b.rating ? 1 : -1);

    this._renderCards(0, Math.min(dataArrayRating.length, CARDS_EXTRA_AMOUNT), dataArrayRating, filmsListTopRatingContainerComponent);

    const extraSectionMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);
    render(this._filmsSectionComponent, extraSectionMostCommentedComponent, RenderPosition.BEFOREEND);
    const filmsListMostCommentedContainerComponent = new FilmsListContainerView();
    render(extraSectionMostCommentedComponent, filmsListMostCommentedContainerComponent, RenderPosition.BEFOREEND);

    // сортируем по комментариям
    let dataArrayComment = this._currentFilmsArray.slice();
    dataArrayComment = dataArrayComment.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);

    this._renderCards(0, Math.min(dataArrayRating.length, CARDS_EXTRA_AMOUNT), dataArrayComment, filmsListMostCommentedContainerComponent);
  }

  _renderMainContent() {
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(0, Math.min(this._currentFilmsArray.length, CARDS_AMOUNT_PER_STEP), this._currentFilmsArray, this._filmsListContainerComponent);

    if (this._currentFilmsArray.length > CARDS_AMOUNT_PER_STEP) {
      this._renderShowMoreButton();

    }

    this._renderExtra();

  }
}
