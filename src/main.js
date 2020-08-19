const FILMS_AMOUNT = 15;

import {createFilmDataTemplate} from "./mocks/film-mock.js";
import {createCommentDataTemplate} from "./mocks/comment-mock";
import TitleOfTheUserView from "./view/user-title.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MoviePresenter from "./presenter/movie-list.js";


// массивы с данными
let filmsData = new Array(FILMS_AMOUNT).fill().map(createFilmDataTemplate);
// filmsData = null;
const commentsData = new Array(FILMS_AMOUNT).fill().map(createCommentDataTemplate);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// пользователь
render(siteHeaderElement, new TitleOfTheUserView(), RenderPosition.BEFOREEND);


// статистика в футоре
render(siteFooterElement, new StatisticsView(filmsData), RenderPosition.BEFOREEND);

const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement);

movieListPresenter.init(filmsData, commentsData);
