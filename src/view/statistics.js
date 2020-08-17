import AbstractView from "./abstract.js";

const createStatisticsTemplate = (data) => {
  const filmsAmount = data !== null ? data.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};

export default class Statistics extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }
}
