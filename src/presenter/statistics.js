import {render, RenderPosition, remove} from "../utils/render.js";
import StatisticsView from "../view/statistics.js";
import FilterModel from "../model/filter.js";
import {UpdateType, FilterType} from "../const.js";
import {filter} from "../utils/filters.js";

export default class Statistics {
  constructor(siteMainElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._currentFilter = null;
    this._siteMainElement = siteMainElement;
    this._filterModel = new FilterModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();

    this._staticticsComponent = new StatisticsView(filters, this._currentFilter);
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

  _getFilters() {
    const films = this._filmsModel.getFilms().filter((item) => item.isWatched);
    return [
      {
        type: FilterType.ALL,
        name: `All-time`,
        movie: filter[FilterType.ALL](films)
      },
      {
        type: FilterType.TODAY,
        name: `Today`,
        movie: filter[FilterType.TODAY](films)
      },
      {
        type: FilterType.WEEK,
        name: `Week`,
        movie: filter[FilterType.WEEK](films)
      },
      {
        type: FilterType.MONTH,
        name: `Month`,
        movie: filter[FilterType.MONTH](films)
      },
      {
        type: FilterType.YEAR,
        name: `Year`,
        movie: filter[FilterType.YEAR](films)
      }
    ];
  }
}

