import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  let difference = new Date() - date;

  if (difference < 1000) {
    return `прямо сейчас`;
  }

  let min = Math.floor(difference / 60000);

  if (min < 60) {
    return `${min} minutes ago`;
  }

  return `${moment(date).format(`YYYY/MM/DD HH:MM`)}`;
};
