import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return `${moment(date).format(`YYYY/MM/DD HH:MM`)}`;
};
