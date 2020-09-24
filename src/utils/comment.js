import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  let diff = new Date() - date;

  if (diff < 1000) {
    return `прямо сейчас`;
  }

  let min = Math.floor(diff / 60000);

  if (min < 60) {
    return `${min} minutes ago`;
  }

  return `${moment(date).format(`YYYY/MM/DD HH:MM`)}`;
};
