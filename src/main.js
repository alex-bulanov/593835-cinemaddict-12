const FILMS_AMOUNT = 15;

import {createFilmDataTemplate} from "./mocks/film-mock.js";
import {createCommentDataTemplate} from "./mocks/comment-mock";
import TitleOfTheUserView from "./view/user-title.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";
import NavModel from "./model/nav.js";
import FilmsModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";


// массивы с данными
let filmsData = new Array(FILMS_AMOUNT).fill().map(createFilmDataTemplate);
// filmsData = null;
const commentsData = new Array(FILMS_AMOUNT).fill().map(createCommentDataTemplate);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);
const commentsModel = new CommentsModel();
commentsModel.setComments(commentsData);

const navModel = new NavModel();


// пользователь
render(siteHeaderElement, new TitleOfTheUserView(), RenderPosition.BEFOREEND);

// навигация
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);

// статистика в футоре
render(siteFooterElement, new StatisticsView(filmsData), RenderPosition.BEFOREEND);

// основной контент
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel, commentsModel);

mainNavPresenter.init();
movieListPresenter.init();
