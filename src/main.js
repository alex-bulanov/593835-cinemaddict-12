const TASK_COUNT = 5;
import { createTitleOfTheUser } from "./view/user-title.js";
import { createMainNavigation } from "./view/main-nav.js";
import { createSorting } from "./view/sorting.js";
import { createFilms } from "./view/films.js";
import { createFilmCard } from "./view/films-card.js";
import { createShowMoreButton } from "./view/show-more-button.js";
import { createFilmsListExtra } from "./view/films-extra.js";
import { createStatistics } from "./view/statistics.js";
import { createFilmDetails } from "./view/films-details.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createTitleOfTheUser(), `beforeend`);
render(siteMainElement, createMainNavigation(), `beforeend`);
render(siteMainElement, createSorting(), `beforeend`);
render(siteMainElement, createFilms(), `beforeend`);

const FilmsListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(FilmsListContainer, createFilmCard(), `beforeend`);
}

const FilmsList = document.querySelector(`.films-list`);
render(FilmsList, createShowMoreButton(), `beforeend`);

const Films = document.querySelector(`.films`);

render(Films, createFilmsListExtra(), `beforeend`);
render(Films, createFilmsListExtra(), `beforeend`);

// находим  блоки extra
const filmsListExtras = document.querySelectorAll(`.films-list--extra`);

// в каждом из блоков выводим по две карточки

filmsListExtras.forEach((filmsListExtra) => {
  const extraFilmsListContainer = filmsListExtra.querySelector(`.films-list__container`);

  render(extraFilmsListContainer, createFilmCard(), `beforeend`);
  render(extraFilmsListContainer, createFilmCard(), `beforeend`);
});


const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatistics, createStatistics(), `beforeend`);

render(siteFooterElement, createFilmDetails(), `afterend`);
