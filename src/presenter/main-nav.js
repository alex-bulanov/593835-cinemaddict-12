import MainNavigationView from "../view/main-nav.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {NavType, UpdateType} from "../const.js";
import {nav} from "../utils/nav.js";

export default class Nav {
  constructor(navContainerComponent, navModel, filmsModel) {
    this._navModel = navModel;
    this._filmsModel = filmsModel;
    this._currentNav = null;
    this._mainNavComponent = null;
    this._navContainerComponent = navContainerComponent;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleNavTypeChange = this._handleNavTypeChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._navModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentNav = this._navModel.getNav();
    const navs = this._getNavs();
    const prevMainNavComponent = this._mainNavComponent;

    this._mainNavComponent = new MainNavigationView(navs, this._currentNav);
    this._mainNavComponent.setNavTypeChangeHandler(this._handleNavTypeChange);

    if (prevMainNavComponent === null) {
      render(this._navContainerComponent, this._mainNavComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._mainNavComponent, prevMainNavComponent);
    remove(prevMainNavComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleNavTypeChange(navType) {
    if (this._currentNav === navType) {
      return;
    }

    if (navType === `stats`) {
      this._navModel.setNav(UpdateType.STATS, navType);
      return;
    }

    this._navModel.setNav(UpdateType.MAJOR, navType);
  }

  _getNavs() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: NavType.ALL,
        name: `All movies`,
        count: nav[NavType.ALL](films).length
      },
      {
        type: NavType.WATCHLIST,
        name: `Watchlist`,
        count: nav[NavType.WATCHLIST](films).length
      },
      {
        type: NavType.HISTORY,
        name: `History`,
        count: nav[NavType.HISTORY](films).length
      },
      {
        type: NavType.FAVORITES,
        name: `Favorites`,
        count: nav[NavType.FAVORITES](films).length
      }
    ];
  }
}
