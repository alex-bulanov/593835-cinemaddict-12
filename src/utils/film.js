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
  if (!(date instanceof Date)) {
    return ``;
  }

  return `${moment(date).format(`H`)}h ${moment(date).format(`mm`)}m`;
};

export const formatDateOfRelease = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`D MMMM YYYY`);
};
