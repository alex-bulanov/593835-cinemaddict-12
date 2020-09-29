import {formatRunTime, formatDateOfRelease} from "../utils/film.js";
import {createCommentTemplate} from "./film-comment";
import {EmojiType} from "../const.js";
import {Key} from "../const.js";
import SmartView from "./smart";

const createGenresTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
};

const createGenreTerm = (genres) => {
  return genres.length > 1 ? `Genres` : `Genre`;
};

const createActorsList = (actors) => {
  return actors.map((actor) => `${actor}`).join(`, `);
};

const createWritersList = (writers) => {
  return writers.map((writer) => `${writer}`).join(`, `);
};

const createFilmDetailsTemplate = (film = {}, comments) => {
  const {
    posterFull = ``,
    title = ``,
    originalTitle = ``,
    rating = ``,
    director = ``,
    writers = ``,
    actors = ``,
    dateOfRelease = ``,
    runtime = ``,
    country = ``,
    genres = ``,

    description = ``,
    ageRating = ``,
    isWatchlist = ``,
    isWatched = ``,
    isFavorite = ``,
    emoji = ``,

    isOffline = false,
  } = film;

  const genresTemplate = createGenresTemplate(genres);
  const genreTerm = createGenreTerm(genres);
  const actorsList = createActorsList(actors);
  const writersList = createWritersList(writers);

  let filmComments = `работа с комментариями недоступна, нет соединения с сервером`;

  if (!isOffline && window.navigator.onLine) {
    filmComments = comments.slice(0, comments.length).map(createCommentTemplate).join(``);
  }

  const commentAmount = comments.length || 0;
  const filmRunTime = formatRunTime(runtime);
  const fimDateOfRelease = formatDateOfRelease(dateOfRelease);

  const commentDescription = ``;
  const currentEmoji = emoji ? emoji : EmojiType.SMILE;
  const currentCommentEmoji = emoji ? emoji : ``;


  const createEmojiTemplate = () => {
    return (

      `<div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${currentEmoji === EmojiType.SMILE ? `checked ` : ``} ${isOffline === true ? `disabled` : ``}>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${currentEmoji === EmojiType.SLEEPING ? `checked` : ``} ${isOffline === true ? `disabled` : ``}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${currentEmoji === EmojiType.PUKE ? `checked` : ``} ${isOffline === true ? `disabled` : ``}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${currentEmoji === EmojiType.ANGRY ? `checked` : ``} ${isOffline === true ? `disabled` : ``}>
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
       </div>`
    );
  };


  const createCommentEmojiTemplate = () => {
    return (
      `<div for="add-emoji" class="film-details__add-emoji-label" data-emoji="${currentCommentEmoji}">
        ${currentCommentEmoji !== `` ? `<img src="images/emoji/${currentCommentEmoji}.png" width="55" height="55" alt="emoji-${currentCommentEmoji}"></img>` : ``}
      </div>`
    );
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${posterFull}" alt="${title}">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${fimDateOfRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmRunTime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreTerm}</td>
                <td class="film-details__cell">
                    ${genresTemplate}
                </td>
              </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist === true ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched === true ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched"">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite === true ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentAmount}</span></h3>

            <ul class="film-details__comments-list">
              ${filmComments}
            </ul>

            <div class="film-details__new-comment">
              ${createCommentEmojiTemplate()}
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isOffline === true ? `disabled` : ``}>${commentDescription}</textarea>
              </label>
              ${createEmojiTemplate()}
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmCardDetails extends SmartView {
  constructor(film, comments) {
    super();
    this._data = film;

    this._comments = comments;
    this._pressed = null;

    this._resetCommentSubmitHandler = this._resetCommentSubmitHandler.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._emojiInputHandler = this._emojiInputHandler.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._keyUpHandler = this._keyUpHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._commentSend = this._commentSend.bind(this);

    this._offlineHandler = this._offlineHandler.bind(this);
    this._onlineHandler = this._onlineHandler.bind(this);

    this._setInnerHandlers();
  }

  _offlineHandler() {
    this.updateData({isOffline: true}, false);
  }

  _onlineHandler() {
    this.updateData({isOffline: false}, false);
  }

  removeListener() {
    window.removeEventListener(`offline`, this._offlineHandler);
    window.removeEventListener(`online`, this._onlineHandler);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  setBlockState() {
    this.getElement().querySelector(`.film-details__inner`).setAttribute(`disabled`, `disabled`);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler() {
    this.updateData({isFavorite: !this._data.isFavorite}, false);
    this._callback.favoriteClick(this._data);
  }

  _watchedClickHandler() {
    this._data.watchingDate = this._data.watchingDate ? null : this._data.watchingDate = new Date();
    this.updateData({isWatched: !this._data.isWatched, watchingDate: this._data.watchingDate}, true);
    this._callback.watchedClick(this._data);
  }

  _watchlistClickHandler() {
    this.updateData({isWatchlist: !this._data.isWatchlist}, false);
    this._callback.watchlistClick(this._data);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    evt.target.setAttribute(`disabled`, `disabled`);
    evt.target.textContent = `Deleting…`;

    const currentCommentId = evt.target.closest(`.film-details__comment`).dataset.id;
    const currentComment = this._comments.find((comment) => comment.id === currentCommentId);

    this._callback.deleteClick(currentComment);
  }

  _keyDownHandler(event) {
    this._pressed.add(event.key);

    const keys = [Key.CONTROL, Key.ENTER];

    for (const key of keys) {
      if (!this._pressed.has(key)) {
        return;
      }
    }
    this._pressed.clear();

    this._commentSend();
  }

  _keyUpHandler(event) {
    this._pressed.delete(event.key);
  }

  _commentSubmitHandler() {
    this._pressed = new Set();

    document.addEventListener(`keydown`, this._keyDownHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
  }

  _resetCommentSubmitHandler() {
    document.removeEventListener(`keydown`, this._keyDownHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  _commentSend() {
    const message = document.querySelector(`.film-details__comment-input`).value.trim();
    const commentEmoji = document.querySelector(`.film-details__add-emoji-label`).dataset.emoji;

    if (message !== `` && commentEmoji !== ``) {
      const comment = {
        id: ``,
        author: ``,
        emoji: commentEmoji,
        text: message,
        date: new Date().toISOString(),
      };

      document.querySelector(`.film-details__comment-input`).setAttribute(`disabled`, `disabled`);
      this._callback.commentSubmit(comment);
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._descriptionInputHandler);

    const emojiItems = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    for (const emojiItem of emojiItems) {
      emojiItem.addEventListener(`click`, this._emojiInputHandler);
    }

    window.addEventListener(`offline`, this._offlineHandler);
    window.addEventListener(`online`, this._onlineHandler);
  }

  _emojiInputHandler(evt) {
    evt.preventDefault();
    this.updateData({emoji: evt.target.value}, false);
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({commentDescription: evt.target.value}, true);
  }

  setHandleCommentSubmit(callback) {
    this._callback.commentSubmit = callback;
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, this._commentSubmitHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, this._resetCommentSubmitHandler);
  }

  setCrossClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteCardClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedCardClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistCardClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    if (deleteButtons) {
      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener(`click`, this._deleteClickHandler);
      }
    }
  }

  restoreHandlers() {
    this.setWatchlistCardClickHandler(this._callback.watchlistClick);
    this.setFavoriteCardClickHandler(this._callback.favoriteClick);
    this.setWatchedCardClickHandler(this._callback.watchedClick);
    this.setHandleCommentSubmit(this._callback.commentSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCrossClickHandler(this._callback.click);
    this._setInnerHandlers();
  }
}
