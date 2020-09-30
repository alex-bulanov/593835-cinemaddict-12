import {UserType} from "../const.js";
import moment from "moment";

const FilmsAmount = {
  NOVICE: 10,
  FAN: 20,
  BUFF: 21
};

export const getSortedByGenres = (films) => {

  if (films.length === 0) {
    return films.length;
  }
  const allGenres = [];

  films.forEach((film) => {
    if (film.genres) {
      allGenres.push(...film.genres);
    }
  });

  const amountWatchedGenres = {};
  allGenres.forEach((genre) => {
    amountWatchedGenres[genre] = amountWatchedGenres[genre] + 1 || 1;
  });

  return amountWatchedGenres;
};

export const getTopGenre = (films) => {
  if (films.length === 0) {
    return ``;
  }

  const amountWatchedGenres = getSortedByGenres(films);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return getKeyByValue(amountWatchedGenres, Math.max.apply(null, Object.values(amountWatchedGenres))) || ``;
};

export const getUserRank = (films) => {

  let userType = null;

  if (films.length <= FilmsAmount.NOVICE) {
    userType = UserType.NOVICE;
  }

  if (films.length > FilmsAmount.NOVICE && films.length <= FilmsAmount.FAN) {
    userType = UserType.FAN;
  }

  if (films.length >= FilmsAmount.BUFF) {
    userType = UserType.BUFF;
  }

  return userType;
};

export const getTotalDuration = (films) => {
  let totalHours = 0;
  let totalMinutes = 0;

  if (films.length === 0) {
    totalHours = 0;
    totalMinutes = 0;
  } else {

    films.forEach((item) => {
      totalHours += +moment(item.runtime).format(`HH`);
      totalMinutes += +moment(item.runtime).format(`MM`);
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  return [totalHours, totalMinutes];
};
