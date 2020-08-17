import {NavType, SortType} from "../const.js";
import MainNavigationView from "../view/main-nav.js";
import SortingView from "../view/sorting.js";
import FilmsSectionView from "../view/films-section.js";
import NoFilmsDataView from "../view/no-films.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card";
import FilmFilmDetailsView from "../view/film-details";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListExtraSectionView from "../view/film-extra.js";
import FilmsListContainerView from "../view/films-list-container.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {compareYear, compareRating} from "../utils/film.js";

const CARDS_AMOUNT_PER_STEP = 5;
const CARDS_EXTRA_AMOUNT = 2;

export default class MovieList {
  constructor(siteMainElement, siteFooterElement) {

    this._currentNavType = NavType.DEFAULT;
    this._currentSortType = SortType.DEFAULT;
    this._siteMainElement = siteMainElement;
    this._siteFooterComponent = siteFooterElement;
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    this._noFilmsSectionComponent = new NoFilmsDataView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleNavTypeChange = this._handleNavTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this.filmDetailsComponent = null;
  }

  init(dataFilmsArray, dataCommentsArray) {
    this._siteMainNavComponent = new MainNavigationView(dataFilmsArray);
    render(this._siteMainElement, this._siteMainNavComponent, RenderPosition.BEFOREEND);
    this._siteMainNavComponent.setNavTypeChangeHandler(this._handleNavTypeChange);

    this._sortingComponent = new SortingView();
    render(this._siteMainElement, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    this._filmsSectionComponent = new FilmsSectionView();
    render(this._siteMainElement, this._filmsSectionComponent, RenderPosition.BEFOREEND);

    if (!dataFilmsArray) {
      render(this._filmsSectionComponent, this._noFilmsSectionComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._dataFilmsArray = dataFilmsArray.slice();
    this._dataCommentsArray = dataCommentsArray.slice();
    this._currentFilmsArray = dataFilmsArray.slice();

    this._renderMainContent();
    this._renderExtra();
  }


  _configureArrayTheTypeOfNav(navType) {
    switch (navType) {
      case NavType.WATCHLIST:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isWatchlist === true);
        break;
      case NavType.HISTORY:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isWatched === true);
        break;
      case NavType.FAVORITES:
        this._currentFilmsArray = this._dataFilmsArray.filter((item) => item.isFavorite === true);
        break;
      default:
        this._currentFilmsArray = this._dataFilmsArray;
    }
    this._currentNavType = navType;
  }

  _configureArrayTheTypeOfSort(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._currentFilmsArray = this._currentFilmsArray.sort(compareYear);
        break;
      case SortType.RATING:
        this._currentFilmsArray = this._currentFilmsArray.sort(compareRating);
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
    // очищаю контент и перезаписываю счетчик для кнопки more
    remove(this._filmsListComponent);
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    // сортирую текущий карточки согласно выбранному пункты и отрисовываю контент
    this._configureArrayTheTypeOfNav(navType);
    this._renderMainContent();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    // очищаю контент и перезаписываю счетчик для кнопки more
    remove(this._filmsListComponent);
    this._renderCardsCount = CARDS_AMOUNT_PER_STEP;
    // сортирую текущий карточки согласно выбранному пункты и отрисовываю контент
    this._configureArrayTheTypeOfSort(sortType);
    this._renderMainContent();
  }


  _handleShowMoreButtonClick() {
    this._renderCards(this._renderCardsCount, this._renderCardsCount + CARDS_AMOUNT_PER_STEP, this._currentFilmsArray, this._filmsListContainerComponent);
    this._renderCardsCount += CARDS_AMOUNT_PER_STEP;

    if (this._renderCardsCount >= this._currentFilmsArray.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCard(dataFilm, listContainerComponent) {
    const filmCardComponent = new FilmCardView(dataFilm);
    render(listContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);

    filmCardComponent.setHandler(() => {
      if (this.filmDetailsComponent) {
        remove(this.filmDetailsComponent);
      }

      this.filmDetailsComponent = new FilmFilmDetailsView(dataFilm, this._dataCommentsArray);
      render(this._siteFooterComponent, this.filmDetailsComponent, RenderPosition.AFTEREEND);
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
    // фильтруем массив сортируем по рейтингу
    let dataArrayRating = this._dataFilmsArray.filter((item) => item.rating > 0);
    if (dataArrayRating.length > 0) {
      const extraSectionTopRatingComponent = new FilmsListExtraSectionView(`Top rated`);
      render(this._filmsSectionComponent, extraSectionTopRatingComponent, RenderPosition.BEFOREEND);
      const filmsListTopRatingContainerComponent = new FilmsListContainerView();
      render(extraSectionTopRatingComponent, filmsListTopRatingContainerComponent, RenderPosition.BEFOREEND);
      dataArrayRating = dataArrayRating.sort((a, b) => a.rating < b.rating ? 1 : -1);
      this._renderCards(0, Math.min(dataArrayRating.length, CARDS_EXTRA_AMOUNT), dataArrayRating, filmsListTopRatingContainerComponent);
    }

    // фильтруем массив и сортируем по комментариям
    let dataArrayComment = this._dataFilmsArray.filter((item) => item.commentsCount > 0);
    if (dataArrayComment.length > 0) {
      const extraSectionMostCommentedComponent = new FilmsListExtraSectionView(`Most commented`);
      render(this._filmsSectionComponent, extraSectionMostCommentedComponent, RenderPosition.BEFOREEND);
      const filmsListMostCommentedContainerComponent = new FilmsListContainerView();
      render(extraSectionMostCommentedComponent, filmsListMostCommentedContainerComponent, RenderPosition.BEFOREEND);
      dataArrayComment = dataArrayComment.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);
      this._renderCards(0, Math.min(dataArrayComment.length, CARDS_EXTRA_AMOUNT), dataArrayComment, filmsListMostCommentedContainerComponent);
    }
  }

  _renderMainContent() {
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);
    this._renderCards(0, Math.min(this._currentFilmsArray.length, CARDS_AMOUNT_PER_STEP), this._currentFilmsArray, this._filmsListContainerComponent);

    if (this._currentFilmsArray.length > CARDS_AMOUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
