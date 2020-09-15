import FooterStatisticsPresenter from "./presenter/footer-statistic.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import {UpdateType} from "./const.js";
import NavModel from "./model/nav.js";
import Api from "./api.js";

const navModel = new NavModel();
const filmsModel = new FilmsModel();

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooterElement, filmsModel);
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel, api);

userPresenter.init();
mainNavPresenter.init();
movieListPresenter.init();
footerStatisticsPresenter.init();

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
});
