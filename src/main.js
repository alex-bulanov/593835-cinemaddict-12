const CARD_AMOUNT = 5;
const FILMS_AMOUN = 15;

const CARD_AMOUNT_PER_STEP = 5;

import {createFilmDataTemplate} from "./mocks/film-mock.js";
// import {createCommentDataTemplate} from "./mocks/comment-mock";

import {createTitleOfTheUser} from "./view/user-title.js";
import {createMainNavigation} from "./view/main-nav.js";
import {createSorting} from "./view/sorting.js";
import {createFilmsSection} from "./view/films-section.js";
import {createFilmCard} from "./view/films-card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createFilmsListExtra} from "./view/films-extra.js";
import {createStatistics} from "./view/statistics.js";
// import {createFilmDetails} from "./view/films-details.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderCards = (data) => {
  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = document.querySelector(`.films-list__container`);

  // отрисовываем 5 карточек с фильмами
  for (let i = 0; i < Math.min(data.length, CARD_AMOUNT); i++) {
    render(filmsListContainer, createFilmCard(data[i]), `beforeend`);
  }
  // если картчек больше 5
  if (data.length > CARD_AMOUNT_PER_STEP) {
    let renderedCardCount = CARD_AMOUNT_PER_STEP;
    render(filmsList, createShowMoreButton(), `beforeend`);
    const showMoreButton = document.querySelector(`.films-list__show-more`);

    showMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      data
        .slice(renderedCardCount, renderedCardCount + CARD_AMOUNT_PER_STEP)
        .forEach((dataItem) => render(filmsListContainer, createFilmCard(dataItem), `beforeend`));

      renderedCardCount += CARD_AMOUNT_PER_STEP;

      if (renderedCardCount >= data.length) {
        showMoreButton.remove();
      }
    });
  }
};

const renderFilmsListContent = (currentData) => {
  // const FilmsList = document.querySelector(`.films-list`);
  const filmsListContainer = document.querySelector(`.films-list__container`);

  // обнуляем содержимое контейнера карточек
  const button = document.querySelector(`.films-list__show-more`);
  filmsListContainer.innerHTML = ``;
  if (button) {
    button.remove();
  }

  // --- >>> ?
  if (!currentData) {
    filmsListContainer.innerHTML = `«There are no movies in our database»`;
    filmsListContainer.style = `justify-content: center`;
  } else {
    renderCards(currentData);
  }
};


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// <--- ф-ции

let filmsData = new Array(FILMS_AMOUN).fill().map(createFilmDataTemplate);
// const commentsData = new Array(TASK_COUNT).fill().map(createCommentDataTemplate);

render(siteHeaderElement, createTitleOfTheUser(), `beforeend`);
render(siteMainElement, createMainNavigation(filmsData), `beforeend`);

render(siteMainElement, createSorting(), `beforeend`);
render(siteMainElement, createFilmsSection(), `beforeend`);

renderFilmsListContent(filmsData);

//  если данные есть отрисовывем блоки extra

if (filmsData) {
  const filmsSection = document.querySelector(`.films`);
  render(filmsSection, createFilmsListExtra(`Top rated`), `beforeend`);
  render(filmsSection, createFilmsListExtra(`Most commented`), `beforeend`);

  // находим  блоки extra
  const filmsListExtras = document.querySelectorAll(`.films-list--extra`);

  // в каждом из блоков выводим по две карточки

  filmsListExtras.forEach((filmsListExtra) => {
    const extraFilmsListContainer = filmsListExtra.querySelector(`.films-list__container`);
    const typeOfExtra = filmsListExtra.querySelector(`.films-list__title`).textContent;
    switch (typeOfExtra) {
      case `Top rated`:
        filmsData.sort((a, b) => a.rating < b.rating ? 1 : -1);
        render(extraFilmsListContainer, createFilmCard(filmsData[0]), `beforeend`);
        render(extraFilmsListContainer, createFilmCard(filmsData[1]), `beforeend`);
        break;
      case `Most commented`:
        filmsData.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);
        render(extraFilmsListContainer, createFilmCard(filmsData[0]), `beforeend`);
        render(extraFilmsListContainer, createFilmCard(filmsData[1]), `beforeend`);
        break;

      default:
        break;
    }
  });
}


// отрисовывоем статистику в футоре
const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatistics, createStatistics(filmsData), `beforeend`);


// render(siteFooterElement, createFilmDetails(filmsData[1], commentsData), `afterend`);


