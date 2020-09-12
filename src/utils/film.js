import moment from "moment";

export const compareYear = (filmA, filmB) => {
  return filmB.dateOfProduction - filmA.dateOfProduction;
};

export const compareRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const compareComments = (filmA, filmB) => {
  return filmB.commentsCount - filmA.commentsCount;
};

export const formatRunTime = (date) => {
  const hours = Math.floor(date / 60);
  const minutes = date % 60;

  return `${hours}:${minutes}`;
};

export const formatDateOfRelease = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return moment(date).format(`D MMMM YYYY`);
};

export const formatDateOfProduction = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return moment(date).format(`YYYY`);
};
