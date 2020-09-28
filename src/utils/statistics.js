import {UserType} from "../const.js";
import moment from "moment";

const FilmsAmount = {
  NOVICE: 10,
  FAN: 20,
  BUFF: 21
};

export const sortedByGenres = (films) => {

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

export const topGenre = (films) => {
  if (films.length === 0) {
    return ``;
  }

  const amountWatchedGenres = sortedByGenres(films);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return getKeyByValue(amountWatchedGenres, Math.max.apply(null, Object.values(amountWatchedGenres))) || ``;
};

export const getUserRank = (data) => {
  let userType = null;

  if (data.length <= FilmsAmount.NOVICE) {
    userType = UserType.NOVICE;
  }

  if (data.length > FilmsAmount.NOVICE && data.length <= FilmsAmount.FAN) {
    userType = UserType.FAN;
  }

  if (data.length >= FilmsAmount.BUFF) {
    userType = UserType.BUFF;
  }

  return userType;
};

export const getTotalDuration = (data) => {
  let totalHours = 0;
  let totalMinutes = 0;

  if (data.length === 0) {
    totalHours = 0;
    totalMinutes = 0;
  } else {

    data.forEach((item) => {
      totalHours += +moment(item.runtime).format(`HH`);
      totalMinutes += +moment(item.runtime).format(`MM`);
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  return [totalHours, totalMinutes];
};
