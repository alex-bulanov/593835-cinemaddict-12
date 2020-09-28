import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  get() {
    return this._films;
  }

  update(updateType, update) {
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
      comments: film.comments,
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
    const adaptedFilm = Object.assign({id: film.id}, {
      "film_info": {
        "actors": film.actors,
        "age_rating": film.ageRating,
        "alternative_title": film.originalTitle,
        "description": film.description,
        "director": film.director,
        "genre": film.genres,
        "poster": film.poster,
        "release": {
          "date": film.dateOfRelease,
          "release_country": film.country,
        },
        "runtime": film.runtime,
        "title": film.title,
        "total_rating": film.rating,
        "writers": film.writers,
      },
      "comments": film.comments,
      "user_details": {
        "watchlist": film.isWatchlist,
        "already_watched": film.isWatched,
        "favorite": film.isFavorite,
        "watching_date": film.watchingDate,
      },
    });

    return adaptedFilm;
  }
}
