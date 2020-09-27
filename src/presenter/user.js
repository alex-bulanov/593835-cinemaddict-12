import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserType} from "../const.js";
import UserView from "../view/user.js";

const FilmsAmount = {
  NOVICE: 10,
  FAN: 20,
  BUFF: 21
};

export default class User {
  constructor(userContainerComponent, filmsModel) {
    this._userContainerComponent = userContainerComponent;
    this._filmsModel = filmsModel;

    this._userComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const userType = this._getUser();
    const prevUserComponent = this._userComponent;
    this._userComponent = new UserView(userType);

    if (prevUserComponent === null) {
      render(this._userContainerComponent, this._userComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevUserComponent) {
      replace(this._userComponent, prevUserComponent);
      return;
    }

    remove(prevUserComponent);
  }

  destroy() {
    remove(this._userComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getUser() {
    const films = this._filmsModel.getFilms();
    const watchedFilms = films.filter((item) => item.isWatched).length;
    let userType = null;
    if (watchedFilms <= FilmsAmount.NOVICE) {
      userType = UserType.NOVICE;
    }

    if (watchedFilms > FilmsAmount.NOVICE && watchedFilms <= FilmsAmount.FAN) {
      userType = UserType.FAN;
    }

    if (watchedFilms >= FilmsAmount.BUFF) {
      userType = UserType.BUFF;
    }

    return userType;
  }
}
