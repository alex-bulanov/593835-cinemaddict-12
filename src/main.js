const FILMS_AMOUNT = 25;

import FooterStatisticsView from "./view/footer-statistics.js";
import {createFilmDataTemplate} from "./mocks/film-mock.js";
import {render, RenderPosition} from "./utils/render.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";

import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/movies.js";
import NavModel from "./model/nav.js";

// массивы с данными
let filmsData = new Array(FILMS_AMOUNT).fill().map(createFilmDataTemplate);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const navModel = new NavModel();

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);

// статистика в футоре
render(siteFooterElement, new FooterStatisticsView(filmsData), RenderPosition.BEFOREEND);

// основной контент
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel);

userPresenter.init();
mainNavPresenter.init();
movieListPresenter.init();
