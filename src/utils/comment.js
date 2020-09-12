import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return `${moment(date).format(`YYYY/MM/DD HH:MM`)}`;
};
