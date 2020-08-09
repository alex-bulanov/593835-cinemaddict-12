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

const drawCards = (containerElement, dataArray, startingIndex, count) => {

  for (let i = 0; i < Math.min(dataArray.length, count); i++) {
    render(containerElement, createFilmCard(dataArray[i]), `beforeend`);
  }

  if (dataArray.length > count && count >= CARD_AMOUNT_PER_STEP) {
    startingIndex = count;

    render(containerElement, createShowMoreButton(), `afterend`);
    const showMoreButton = document.querySelector(`.films-list__show-more`);

    showMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      dataArray
        .slice(startingIndex, startingIndex + count)
        .forEach((dataItem) => render(containerElement, createFilmCard(dataItem), `beforeend`));

      startingIndex += count;

      if (startingIndex >= dataArray.length) {
        showMoreButton.remove();
      }
    });
  }
};

const renderFilmsListContent = (currentData) => {
  const filmsListContainer = document.querySelector(`.films-list__container`);

  // обнуляем содержимое контейнера карточек
  filmsListContainer.innerHTML = ``;

  // удаляем, если она есть, кнопку
  const button = document.querySelector(`.films-list__show-more`);
  if (button) {
    button.remove();
  }

  // если данных нет, выводим сообщение
  if (!currentData) {
    filmsListContainer.innerHTML = `«There are no movies in our database»`;
    filmsListContainer.style = `justify-content: center`;
  } else {
    // выводим карточки
    let startingIndexDrawCard = 0;
    drawCards(filmsListContainer, currentData, startingIndexDrawCard, CARD_AMOUNT_PER_STEP);
  }
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


//  --- start ---

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
    const extraCardAmount = 2;
    switch (typeOfExtra) {
      case `Top rated`:
        filmsData.sort((a, b) => a.rating < b.rating ? 1 : -1);
        drawCards(extraFilmsListContainer, filmsData, 0, extraCardAmount);
        break;
      case `Most commented`:
        filmsData.sort((a, b) => a.commentsCount < b.commentsCount ? 1 : -1);
        drawCards(extraFilmsListContainer, filmsData, 0, extraCardAmount);
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


