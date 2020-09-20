import FooterStatisticsPresenter from "./presenter/footer-statistic.js";
import MainNavPresenter from "./presenter/main-nav.js";
import MoviePresenter from "./presenter/movie-list.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import {UpdateType} from "./const.js";
import NavModel from "./model/nav.js";
import Api from "./api/api.js";

import Store from "./api/store.js";
import Provider from "./api/provider.js";

const navModel = new NavModel();
const filmsModel = new FilmsModel();

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
const mainNavPresenter = new MainNavPresenter(siteMainElement, navModel, filmsModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooterElement, filmsModel);
const movieListPresenter = new MoviePresenter(siteMainElement, siteFooterElement, navModel, filmsModel, apiWithProvider);

userPresenter.init();
mainNavPresenter.init();
movieListPresenter.init();
footerStatisticsPresenter.init();

apiWithProvider.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
