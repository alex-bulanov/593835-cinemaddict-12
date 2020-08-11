import {createElement} from "../utils.js";

const createStatisticsTemplate = (data) => {
  const filmsAmount = data !== null ? data.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};

export default class Statistics {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
