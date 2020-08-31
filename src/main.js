const FILMS_AMOUNT = 25;

import {createFilmDataTemplate} from "./mocks/film-mock.js";
import {createCommentDataTemplate} from "./mocks/comment-mock";
import {render, RenderPosition} from "./utils/render.js";

import StatisticsView from "./view/statistics.js";

import UserPresenter from "./presenter/user.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";

import NavModel from "./model/nav.js";
import FilmsModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";


// массивы с данными
let filmsData = new Array(FILMS_AMOUNT).fill().map(createFilmDataTemplate);
const commentsData = new Array(FILMS_AMOUNT).fill().map(createCommentDataTemplate);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);
const commentsModel = new CommentsModel();
commentsModel.setComments(commentsData);

const navModel = new NavModel();

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);

// статистика в футоре
render(siteFooterElement, new StatisticsView(filmsData), RenderPosition.BEFOREEND);

// основной контент
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel, commentsModel);

userPresenter.init();
mainNavPresenter.init();
movieListPresenter.init();
