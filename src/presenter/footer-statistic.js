import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FooterStatisticsView from "../view/footer-statistics.js";

export default class FooterStatistics {
  constructor(footerContainerComponent, filmsModel) {
    this._footerContainerComponent = footerContainerComponent;
    this._filmsModel = filmsModel;

    this._footerComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevFooterComponent = this._footerComponent;
    this._footerComponent = new FooterStatisticsView(this._filmsModel.get());

    if (prevFooterComponent === null) {
      render(this._footerContainerComponent, this._footerComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevFooterComponent) {
      replace(this._footerComponent, prevFooterComponent);
      return;
    }

    remove(prevFooterComponent);
  }

  destroy() {
    remove(this._footerComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
