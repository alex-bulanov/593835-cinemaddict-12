import FooterStatisticsView from "./view/footer-statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/movies.js";
import {UpdateType} from "./const.js";
import NavModel from "./model/nav.js";
import Api from "./api.js";

const filmsModel = new FilmsModel();

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const navModel = new NavModel();

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);


// основной контент
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel, api);

userPresenter.init();
mainNavPresenter.init();
movieListPresenter.init();

render(siteFooterElement, new FooterStatisticsView(filmsModel.getFilms()), RenderPosition.BEFOREEND);

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
});
