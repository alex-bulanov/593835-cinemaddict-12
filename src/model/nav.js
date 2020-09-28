import Observer from "../utils/observer.js";
import {NavType} from "../const.js";

export default class Nav extends Observer {
  constructor() {
    super();
    this._activeNav = NavType.ALL;
  }

  set(updateType, nav) {
    this._activeNav = nav;
    this._notify(updateType, nav);
  }

  get() {
    return this._activeNav;
  }
}
