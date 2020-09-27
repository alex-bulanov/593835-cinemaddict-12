import {UserType} from "../const.js";
import moment from "moment";

const FilmsAmount = {
  NOVICE: 10,
  FAN: 20,
  BUFF: 21
};

export const sortedGenres = (data) => {
  if (data.length === 0) {
    return data.length;
  }
  const allGenres = [];

  data.forEach((film) => {
    if (film.genre) {
      allGenres.push(film.genre);
    }
  });

  const amountWatchedGenres = {};
  allGenres.forEach((genre) => {
    amountWatchedGenres[genre] = amountWatchedGenres[genre] + 1 || 1;
  });

  return amountWatchedGenres;
};

export const topGenre = (data) => {
  if (data.length === 0) {
    return ``;
  }

  const amountWatchedGenres = sortedGenres(data);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return getKeyByValue(amountWatchedGenres, Math.max.apply(null, Object.values(amountWatchedGenres))) || ``;
};

export const userRank = (data) => {
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

export const totalDuration = (data) => {
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
