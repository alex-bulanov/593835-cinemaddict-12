import {formatCommentDate} from "../utils/comment.js";
import he from "he";

export const createCommentTemplate = (comment = {}) => {
  const {
    id = ``,
    author = ``,
    text = ``,
    emoji = ``,
    date = ``
  } = comment;

  const commentDate = formatCommentDate(date);

  return (
    `
    <li class="film-details__comment" data-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    `
  );
};
