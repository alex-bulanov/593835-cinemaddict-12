import {nanoid} from "nanoid";
import FilmsModel from "../model/films.js";

const getSyncedFilms = (films) => {
  return films.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (films) => {
  return films.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateTask(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  addFilm(film) {
    if (Provider.isOnline()) {
      return this._api.addFilm(film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, FilmsModel.adaptToServer(newFilm));
          return newFilm;
        });
    }

    const localNewFilmId = nanoid();
    const localNewFilm = Object.assign({}, film, {id: localNewFilmId});

    this._store.setItem(localNewFilm.id, FilmsModel.adaptToServer(localNewFilm));

    return Promise.resolve(localNewFilm);
  }

  deleteFilm(film) {
    if (Provider.isOnline()) {
      return this._api.deleteFilm(film)
        .then(() => this._store.removeItem(film.id));
    }

    this._store.removeItem(film.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getFilms());

      return this._api.sync(storeFilms)
        .then((response) => {
          const createdFilms = getSyncedFilms(response.created);
          const updatedFilms = getSyncedFilms(response.updated);

          const items = createStoreStructure([...createdFilms, ...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
