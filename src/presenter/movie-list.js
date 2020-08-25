import {NavType, SortType} from "../const.js";
import MainNavigationView from "../view/main-nav.js";
import SortingView from "../view/sorting.js";
import FilmsSectionView from "../view/films-section.js";
import NoFilmsDataView from "../view/no-films.js";
import FilmsListView from "../view/films-list.js";
import FilmPresenter from "./film.js";

import {updateItem} from "../utils/common.js";

import ShowMoreButtonView from "../view/show-more-button.js";

// import FilmsListExtraSectionView from "../view/film-extra.js";

import FilmsListContainerView from "../view/films-list-container.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating} from "../utils/film.js";

const CARDS_AMOUNT_PER_STEP = 5;
// const CARDS_EXTRA_AMOUNT = 2;

export default class MovieList {
  constructor(siteMainElement, siteFooterElement) {
    this._currentNavType = NavType.DEFAULT;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._siteMainElement = siteMainElement;
    this._siteFooterComponent = siteFooterElement;
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    this._noFilmsSectionComponent = new NoFilmsDataView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleNavTypeChange = this._handleNavTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);

    this.filmDetailsComponent = null;
  }

  init(dataFilmsArray, dataCommentsArray) {
    this._dataFilmsArray = dataFilmsArray.slice();
    this._dataCommentsArray = dataCommentsArray.slice();
    this._currentFilmsArray = dataFilmsArray.slice();
    this._renderNavigation(this._currentFilmsArray, RenderPosition.BEFOREEND);
    this._sortingComponent = new SortingView();
    render(this._siteMainElement, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    this._filmsSectionComponent = new FilmsSectionView();
    render(this._siteMainElement, this._filmsSectionComponent, RenderPosition.BEFOREEND);

    if (!dataFilmsArray) {
      render(this._filmsSectionComponent, this._noFilmsSectionComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderMainContent();
    // this._renderExtra();
  }

  _renderNavigation(dataFilmsArray, position) {
    this._siteMainNavComponent = new MainNavigationView(dataFilmsArray);
    render(this._siteMainElement, this._siteMainNavComponent, position);
    this._siteMainNavComponent.setNavTypeChangeHandler(this._handleNavTypeChange);

  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedFilm) {
    this._currentFilmsArray = updateItem(this._currentFilmsArray, updatedFilm);
    this._dataFilmsArray = updateItem(this._dataFilmsArray, updatedFilm);

    remove(this._siteMainNavComponent);
    this._renderNavigation(this._currentFilmsArray, RenderPosition.AFTERBEGIN);
    this._filmPresenter[updatedFilm.id].init(updatedFilm, this._dataCommentsArray);
  }


  _applyNavigation(navType) {
    switch (navType) {
      case NavType.WATCHLIST:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isWatchlist);
        break;
      case NavType.HISTORY:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isWatched);
        break;
      case NavType.FAVORITES:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isFavorite);
        break;
      default:
        this._currentFilmsArray = this._dataFilmsArray;
    }

    if (this._currentSortType !== SortType.DEFAULT) {
      this._applySorting(this._currentSortType);
    }

    this._currentNavType = navType;
  }

  _applySorting(sortType) {

    switch (sortType) {
      case SortType.DATE:
        this._currentFilmsArray.sort(compareYear);
        break;
      case SortType.RATING:
        this._currentFilmsArray.sort(compareRating);
        break;
      default:
        this._currentFilmsArray = this._dataFilmsArray;
    }

    this._currentSortType = sortType;
  }

  _handleNavTypeChange(navType) {
    if (this._currentNavType === navType) {
      return;
    }

    remove(this._filmsListComponent);
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;

    this._applyNavigation(navType);
    this._renderMainContent();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    remove(this._filmsListComponent);
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;

    this._applySorting(sortType);
    this._renderMainContent();
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderCardsCount, this._renderCardsCount + CARDS_AMOUNT_PER_STEP, this._currentFilmsArray, this._dataCommentsArray, this._filmsListContainerComponent);
    this._renderCardsCount += CARDS_AMOUNT_PER_STEP;

    if (this._renderCardsCount >= this._currentFilmsArray.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCard(film, comments, listContainerComponent) {
    const filmPresenter = new FilmPresenter(this._siteFooterComponent, listContainerComponent, this._handleCardChange, this._handleModeChange);

    filmPresenter.init(film, comments);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderCards(from, to, currentFilmsArray, dataCommentsArray, place) {
    currentFilmsArray
      .slice(from, to)
      .forEach((dataFilm) => this._renderCard(dataFilm, dataCommentsArray, place));
  }

  // _renderExtra() {
  //   // фильтруем массив сортируем по рейтингу
  //   let dataArrayRating = this._dataFilmsArray.filter((item) => item.rating > 0);
  //   if (dataArrayRating.length > 0) {
  //     const extraSectionTopRatingComponent = new FilmsListExtraSectionView(`Top rated`);
  //     render(this._filmsSectionComponent, extraSectionTopRatingComponent, RenderPosition.BEFOREEND);
  //     const filmsListTopRatingContainerComponent = new FilmsListContainerView();
  //     render(extraSectionTopRatingComponent, filmsListTopRatingContainerComponent, RenderPosition.BEFOREEND);
  //     dataArrayRating = dataArrayRating.sort((a, b) => a.rating < b.rating ? 1 : -1);
  //     this._renderCards(0, Math.min(dataArrayRating.length, CARDS_EXTRA_AMOUNT), dataArrayRating, filmsListTopRatingContainerComponent);
  //   }

  //   // фильтруем массив и сортируем по комментариям
  //   let dataArrayComment = this._dataFilmsArray.filter((item) => item.commentsCount > 0);
  //   if (dataArrayComment.length > 0) {
  //     const extraSectionMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);
  //     render(this._filmsSectionComponent, extraSectionMostCommentedComponent, RenderPosition.BEFOREEND);
  //     const filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  //     render(extraSectionMostCommentedComponent, filmsListMostCommentedContainerComponent, RenderPosition.BEFOREEND);
  //     dataArrayComment = dataArrayComment.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);
  //     this._renderCards(0, Math.min(dataArrayComment.length, CARDS_EXTRA_AMOUNT), dataArrayComment, filmsListMostCommentedContainerComponent);
  //   }
  // }


  _renderMainContent() {
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(0, Math.min(this._currentFilmsArray.length, CARDS_AMOUNT_PER_STEP), this._currentFilmsArray, this._dataCommentsArray, this._filmsListContainerComponent);

    if (this._currentFilmsArray.length > CARDS_AMOUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
