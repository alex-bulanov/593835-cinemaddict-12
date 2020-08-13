import {createElement} from "../utils.js";

const createNoFilmsDataTemplate = () => {
  return (
    `<p style="margin: 30px auto;">«There are no movies in our database»</p>`
  );
};

export default class NoFilmsData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsDataTemplate();
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
