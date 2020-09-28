import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }

  add(updateType, update) {

    this._comments = [
      update,
      ...this._comments
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting film`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(comment) {

    const adaptedComment = Object.assign({}, comment, {
      emoji: comment.emotion,
      text: comment.comment,
    });

    delete adaptedComment.emotion;
    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign({}, comment, {
      "comment": comment.text,
      "emotion": comment.emoji,
    }
    );

    delete adaptedComment.id;
    delete adaptedComment.text;
    delete adaptedComment.emoji;
    delete adaptedComment.author;

    return adaptedComment;
  }
}
