import AbstractView from "./abstract.js";

const createFooterStatisticsTemplate = (films) => {
  const filmsAmount = films !== null ? films.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films);
  }
}
