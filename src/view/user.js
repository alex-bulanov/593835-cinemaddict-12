import SmartView from "./smart.js";

const createUserTemplate = (userType) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userType}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class User extends SmartView {
  constructor(userType) {
    super();
    this._userType = userType;
  }

  getTemplate() {
    return createUserTemplate(this._userType);
  }
}
