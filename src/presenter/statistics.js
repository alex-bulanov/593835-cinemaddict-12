import {render, RenderPosition, remove} from "../utils/render.js";
import StatisticsView from "../view/statistics.js";
import FilterModel from "../model/filter.js";
import {UpdateType} from "../const.js";

export default class Statistics {
  constructor(siteMainElement, data) {
    this._data = data;
    this._currentFilter = null;
    this._siteMainElement = siteMainElement;
    this._filterModel = new FilterModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._staticticsComponent = new StatisticsView(this._data, this._currentFilter);
    this._staticticsComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    render(this._siteMainElement, this._staticticsComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._staticticsComponent);
  }

  _handleModelEvent(updateType) {

    switch (updateType) {
      case UpdateType.MAJOR:
        this.destroy();
        this.init();
        break;
    }
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

