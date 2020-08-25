import {createFilmDetailsComment} from "./film-details-comment";
import SmartView from "./smart";
import {formatRunTime, formatDateOfRelease} from "../utils/film.js";

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


const createFilmDetailsTemplate = (data = {}, comments) => {
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
    commentsCount = ``,
    description = ``,
    ageRating = ``,

  } = data;


  const genresTemplate = createGenresTemplate(genres);
  const genreTerm = createGenreTerm(genres);
  const actorsList = createActorsList(actors);
  const writersList = createWritersList(writers);

  const filmDetailsComments = comments.slice(0, commentsCount).map(createFilmDetailsComment).join(``);
  const filmRunTime = formatRunTime(runtime);
  const fimDateOfRelease = formatDateOfRelease(dateOfRelease);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${posterFull}" alt="${title}">

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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched"">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
            <ul class="film-details__comments-list">
              ${filmDetailsComments}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">

              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmCardDetails extends SmartView {
  constructor(data, comments) {
    super();
    this._comments = comments;
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _clickEmojiHandler(evt) {
    evt.preventDefault();
    this._callback.emojiClick();

    const emojiItems = document.querySelectorAll(`.film-details__emoji-item`);

    emojiItems.forEach((emojiItem) => {
      if (evt.target.value !== emojiItem.value) {
        emojiItem.removeAttribute(`checked`);
      } else {
        emojiItem.setAttribute(`checked`, ``);
      }
    });

    const addEmojiLabel = document.querySelector(`.film-details__add-emoji-label`);
    const addEmojiImage = `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}"></img>`;
    addEmojiLabel.innerHTML = addEmojiImage;
  }


  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setEmojiClickHandler(callback) {
    this._callback.emojiClick = callback;
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emojis.forEach((emoji) => {
      emoji.addEventListener(`click`, this._clickEmojiHandler);
    });
  }

  restoreHandlers() {
    this.setEmojiClickHandler(this._callback.emojiClick);
    this.setClickHandler(this._callback.click);
  }
}