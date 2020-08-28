import {UpdateType, SortType, UserAction} from "../const.js";
import {nav} from "../utils/nav.js";
import SortingView from "../view/sorting.js";
import FilmsSectionView from "../view/films-section.js";
import NoFilmsDataView from "../view/no-films.js";
import FilmsListView from "../view/films-list.js";
import FilmPresenter from "./film.js";
import ShowMoreButtonView from "../view/show-more-button.js";

import FilmsListExtraSectionView from "../view/film-extra.js";

import FilmsListContainerView from "../view/films-list-container.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating, compareComments} from "../utils/film.js";

const CARDS_AMOUNT_PER_STEP = 5;
// const CARDS_EXTRA_AMOUNT = 2;


export default class MovieList {
  constructor(siteMainElement, siteFooterElement, navModel, filmsModel, commentsModel) {
    this._navModel = navModel;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._siteMainElement = siteMainElement;
    this._siteFooterComponent = siteFooterElement;
    this._showMoreButtonComponent = null;
    this._sortingComponent = null;
    this._filmsListComponent = null;
    this.filmDetailsComponent = null;
    this._noFilmsComponent = new NoFilmsDataView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._comments = this._getComments();

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navModel.addObserver(this._handleModelEvent);

    this._filmsSectionComponent = new FilmsSectionView();
    render(this._siteMainElement, this._filmsSectionComponent, RenderPosition.BEFOREEND);

    this._renderMainContent();
    this._renderExtra();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsSectionComponent, this._sortingComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderNoFilmsComponent() {
    render(this._filmsSectionComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _getFilms() {
    const navType = this._navModel.getNav();
    const films = this._filmsModel.getFilms();
    const navFilms = nav[navType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return navFilms.sort(compareYear);
      case SortType.RATING:
        return navFilms.sort(compareRating);
    }
    return navFilms;
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      // case UserAction.ADD_FILM:
      //   this._filmModel.addFilm(updateType, update);
      //   break;
      // case UserAction.DELETE_FILM:
      //   this._filmModel.deleteFilm(updateType, update);
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMainContent();
        this._renderMainContent();
        break;
      case UpdateType.MAJOR:
        this._clearMainContent({resetRenderedCardCount: true, resetSortType: true});
        this._renderMainContent();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMainContent({resetRenderedCardCount: true});
    this._renderMainContent();
  }

  // ----> добавить в отрисовку карточек комментарии

  _handleShowMoreButtonClick() {
    const cardCount = this._getFilms().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderCardsCount + CARDS_AMOUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderCardsCount, newRenderedCardCount);

    this._renderCards(films, this._comments, this._filmsListContainerComponent);
    this._renderCardsCount = newRenderedCardCount;


    if (this._renderCardsCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(film, comments, place) {
    const filmPresenter = new FilmPresenter(this._siteFooterComponent, place, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film, comments);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderCards(films, comments, place) {
    films.forEach((film) => this._renderCard(film, comments, place));
  }


  _renderExtra() {
    // фильтруем массив сортируем по рейтингу
    let filmsRating = this._filmsModel.getFilms();
    filmsRating = filmsRating.sort(compareRating);

    if (filmsRating.length > 0) {
      const extraSectionTopRatingComponent = new FilmsListExtraSectionView(`Top rated`);
      render(this._filmsSectionComponent, extraSectionTopRatingComponent, RenderPosition.BEFOREEND);
      const filmsListTopRatingContainerComponent = new FilmsListContainerView();
      render(extraSectionTopRatingComponent, filmsListTopRatingContainerComponent, RenderPosition.BEFOREEND);

    }


    // // фильтруем массив и сортируем по комментариям
    let filmsCommented = this._filmsModel.getFilms();
    filmsCommented = filmsRating.sort(compareComments);

    if (filmsCommented.length > 0) {
      const extraSectionMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);
      render(this._filmsSectionComponent, extraSectionMostCommentedComponent, RenderPosition.BEFOREEND);
      const filmsListMostCommentedContainerComponent = new FilmsListContainerView();
      render(extraSectionMostCommentedComponent, filmsListMostCommentedContainerComponent, RenderPosition.BEFOREEND);


    }
  }


  _clearMainContent({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());
    this._filmPresenter = {};

    remove(this._sortingComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    } else {
      this._renderCardsCount = Math.min(cardCount, this._renderCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderMainContent() {
    const films = this._getFilms();

    const cardCount = films.length;

    this._renderSorting();

    if (this._filmsListComponent !== null) {
      remove(this._filmsListComponent);
    }

    if (cardCount === 0) {
      this._renderNoFilmsComponent();
      return;
    }

    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(films.slice(0, Math.min(cardCount, this._renderCardsCount)), this._comments, this._filmsListContainerComponent);

    if (cardCount > this._renderCardsCount) {
      this._renderShowMoreButton();
    }
  }
}
