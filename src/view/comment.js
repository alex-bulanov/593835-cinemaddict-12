import SmartView from "./smart.js";
import {formatCommentDate} from "../utils/comment.js";

const createCommentTemplate = (comment = {}) => {
  const {
    author = ``,
    text = ``,
    emoji = ``,
    date = ``
  } = comment;

  const commentDate = formatCommentDate(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};




export default class Comment extends SmartView {
  constructor(comment) {
    super();
    this._comment = comment;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  // _favoriteClickHandler(evt) {
  //   evt.preventDefault();
  //   evt.target.classList.toggle(`film-card__controls-item--active`);
  //   this._callback.favoriteClick();
  //   this.updateData({isFavorite: !this._data.isFavorite}, true);
  // }

  // setFavoriteCardClickHandler(callback) {
  //   this._callback.favoriteClick = callback;
  //   this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  // }
}
