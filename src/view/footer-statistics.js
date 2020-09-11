import AbstractView from "./abstract.js";

const createFooterStatisticsTemplate = (data) => {
  const filmsAmount = data !== null ? data.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._data);
  }
}
