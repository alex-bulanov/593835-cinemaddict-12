const FILMS_AMOUN = 15;
const CARDS_AMOUNT_PER_STEP = 5;
const CARDS_EXTRA_AMOUNT = 2;

import {render, RenderPosition} from "./utils.js";
import {createFilmDataTemplate} from "./mocks/film-mock.js";
import {createCommentDataTemplate} from "./mocks/comment-mock";

import TitleOfTheUserView from "./view/user-title.js";
import MainNavigationView from "./view/main-nav.js";
import SortingView from "./view/sorting.js";
import FilmsSectionView from "./view/films-section.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import NoFilmsDataView from "./view/no-films.js";
import FilmCardView from "./view/films-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsListExtraSectionView from "./view/films-extra.js";
import FilmDetailsView from "./view/films-details.js";

import StatisticsView from "./view/statistics.js";

// массив с фильмами
let filmsData = new Array(FILMS_AMOUN).fill().map(createFilmDataTemplate);
// filmsData = null;

// массив с комментариями
const commentsData = new Array(FILMS_AMOUN).fill().map(createCommentDataTemplate);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// пользователь
const user = new TitleOfTheUserView();
render(siteHeaderElement, user.getElement(), RenderPosition.BEFOREEND);

// главная нвигация
const mainNav = new MainNavigationView(filmsData);
render(siteMainElement, mainNav.getElement(), RenderPosition.BEFOREEND);

// сортировка
const sorting = new SortingView();
render(siteMainElement, sorting.getElement(), RenderPosition.BEFOREEND);

// статистика в футоре
const footerStatistics = new StatisticsView(filmsData);
render(siteFooterElement, footerStatistics.getElement(), RenderPosition.BEFOREEND);


// Отрисовка карточи

const renderCard = (cardListElement, currentFilmData, commentArray, position) => {

  const filmCardComponent = new FilmCardView(currentFilmData);
  const filmFilmDetailsComponent = new FilmDetailsView(currentFilmData, commentArray);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      // закрываем попап
      filmFilmDetailsComponent.getElement().remove();
      filmFilmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onCloseButton = () => {
    // закрываем попап
    filmFilmDetailsComponent.getElement().remove();
    filmFilmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.removeEventListener(`click`, onCloseButton);
  };

  const showFilmFilmDetails = () => {
    render(siteFooterElement, filmFilmDetailsComponent.getElement(), position);
    document.addEventListener(`keydown`, onEscKeyDown);
    const closeButon = filmFilmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
    closeButon.addEventListener(`click`, onCloseButton);
  };

  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    // показываем попап
    showFilmFilmDetails();
  });

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    // показываем попап
    showFilmFilmDetails();
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    // показываем попап
    showFilmFilmDetails();
  });

  render(cardListElement, filmCardComponent.getElement(), position);
};

// ---> Функии отрисовки главного содержимого

const renderMainContent = (filmsContainer, dataArray, commentArray) => {
  // главная секция с фильмами
  const filmsSectionComponent = new FilmsSectionView();
  render(filmsContainer, filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);

  if (!dataArray) {
    const notification = new NoFilmsDataView();
    render(filmsSectionComponent.getElement(), notification.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  // секция с карточками фильмов
  const filmsListComponent = new FilmsListView();
  render(filmsSectionComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

  // секция контейнера списка карточек
  const filmsListContainerComponent = new FilmsListContainerView();
  render(filmsListComponent.getElement(), filmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);


  for (let i = 0; i < Math.min(dataArray.length, CARDS_AMOUNT_PER_STEP); i++) {
    // render(filmsListContainerComponent.getElement(), new FilmCardView(dataArray[i]).getElement(), RenderPosition.BEFOREEND);
    renderCard(filmsListContainerComponent.getElement(), dataArray[i], commentArray, RenderPosition.BEFOREEND);
  }

  if (dataArray.length > CARDS_AMOUNT_PER_STEP && CARDS_AMOUNT_PER_STEP >= CARDS_AMOUNT_PER_STEP) {
    let renderedCardsCount = CARDS_AMOUNT_PER_STEP;

    // отрисовка кнопки ShowMore

    const loadMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      dataArray
        .slice(renderedCardsCount, renderedCardsCount + CARDS_AMOUNT_PER_STEP)
        .forEach((dataItem) => renderCard(filmsListContainerComponent.getElement(), dataItem, commentArray, RenderPosition.BEFOREEND));

      renderedCardsCount += CARDS_AMOUNT_PER_STEP;

      if (renderedCardsCount >= dataArray.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }


  //  extra - TOP
  const extraSectionTopRating = new FilmsListExtraSectionView(`Top rated`);
  render(filmsSectionComponent.getElement(), extraSectionTopRating.getElement(), RenderPosition.BEFOREEND);
  const extraSectionTopList = new FilmsListContainerView();
  render(extraSectionTopRating.getElement(), extraSectionTopList.getElement(), RenderPosition.BEFOREEND);

  // сортируем по рейтингу
  const dataArrayRating = dataArray.sort((a, b) => a.rating < b.rating ? 1 : -1);

  for (let i = 0; i < Math.min(dataArrayRating.length, CARDS_EXTRA_AMOUNT); i++) {
    renderCard(extraSectionTopList.getElement(), dataArrayRating[i], commentArray, RenderPosition.BEFOREEND);
  }

  //  extra - COMMENTS
  const extraSectionMostCommented = new FilmsListExtraSectionView(`Most commented`);
  render(filmsSectionComponent.getElement(), extraSectionMostCommented.getElement(), RenderPosition.BEFOREEND);
  const extraSectionCommentedList = new FilmsListContainerView();
  render(extraSectionMostCommented.getElement(), extraSectionCommentedList.getElement(), RenderPosition.BEFOREEND);

  // сортируем по кол-ву комментариев

  const dataArrayCommented = dataArray.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);

  for (let i = 0; i < Math.min(dataArrayCommented.length, CARDS_EXTRA_AMOUNT); i++) {
    renderCard(extraSectionCommentedList.getElement(), dataArrayCommented[i], commentArray, RenderPosition.BEFOREEND);
  }
};

// <--- Функции отрисовки


renderMainContent(siteMainElement, filmsData, commentsData);
