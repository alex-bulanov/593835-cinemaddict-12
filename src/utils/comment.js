import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return `${moment(date).format(`YYYY`)}/${moment(date).format(`MM`)}/${moment(date).format(`DD`)} ${moment(date).format(`HH:MM`)}`;
};
