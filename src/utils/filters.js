import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.TODAY]: (films) => films.filter((film) => compareToday(film)),
  [FilterType.WEEK]: (films) => films.filter((film) => compareWeek(film)),
  [FilterType.MONTH]: (films) => films.filter((film) => compareMonth(film)),
  [FilterType.YEAR]: (films) => films.filter((film) => compareYear(film)),
};


const compareToday = (film) => {
  const currentDate = new Date();
  let isFlag = false;
  if (new Date(film.watchingDate).getDate() === currentDate.getDate()) {
    isFlag = true;
  }
  return isFlag;
};

const compareWeek = (film) => {
  const currentDate = new Date();
  let isFlag = false;
  if (new Date(film.watchingDate) >= new Date(currentDate.setDate(currentDate.getDate() - 7))) {
    isFlag = true;
  }
  return isFlag;
};


const compareMonth = (film) => {
  const currentDate = new Date();
  let isFlag = false;
  if (new Date(film.watchingDate) >= new Date(currentDate.setMonth(currentDate.getMonth() - 1))) {
    isFlag = true;
  }
  return isFlag;
};

const compareYear = (film) => {
  const currentDate = new Date();
  let isFlag = false;
  if (new Date(film.watchingDate).getFullYear() >= currentDate.getFullYear()) {
    isFlag = true;
  }
  return isFlag;
};
