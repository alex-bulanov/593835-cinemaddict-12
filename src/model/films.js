import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign({}, film, {
      actors: film.film_info.actors,
      ageRating: film.film_info.age_rating,
      originalTitle: film.film_info.alternative_title,
      description: film.film_info.description,
      director: film.film_info.director,
      genres: film.film_info.genre,
      genre: film.film_info.genre[0],
      poster: film.film_info.poster,
      posterFull: film.film_info.poster,
      dateOfRelease: film.film_info.release.date,
      dateOfProduction: film.film_info.release.date,
      country: film.film_info.release.release_country,
      runtime: film.film_info.runtime,
      title: film.film_info.title,
      rating: film.film_info.total_rating,
      writers: film.film_info.writers,
      commentsCount: film.comments.length,
      isWatchlist: film.user_details.watchlist,
      isWatched: film.user_details.already_watched,
      isFavorite: film.user_details.favorite,
      watchingDate: film.user_details.watching_date,
    });

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign({}, film, {});

    return adaptedFilm;
  }
}
