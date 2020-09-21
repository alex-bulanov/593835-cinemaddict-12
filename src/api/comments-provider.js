import {nanoid} from "nanoid";
import CommentsModel from "../model/comments.js";

const getSyncedComments = (comments) => {
  return comments.filter(({success}) => success)
    .map(({payload}) => payload.comment);
};

const createStoreStructure = (comments) => {
  return comments.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class CommentsProvider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getComments() {
    if (CommentsProvider.isOnline()) {
      return this._api.getComments()
        .then((comments) => {
          const items = createStoreStructure(comments.map(CommentsModel.adaptToServer));
          this._store.setItems(items);
          return comments;
        });
    }

    const storeComments = Object.values(this._store.getItems());

    return Promise.resolve(storeComments.map(CommentsModel.adaptToClient));
  }

  updateComments(comment) {
    if (CommentsProvider.isOnline()) {
      return this._api.updateComments(comment)
        .then((updatedComment) => {
          this._store.setItem(updatedComment.id, CommentsModel.adaptToServer(updatedComment));
          return updatedComment;
        });
    }

    this._store.setItem(comment.id, CommentsModel.adaptToServer(Object.assign({}, comment)));

    return Promise.resolve(comment);
  }

  addComment(comment) {
    if (CommentsProvider.isOnline()) {
      return this._api.addComment(comment)
        .then((newComment) => {
          this._store.setItem(newComment.id, CommentsModel.adaptToServer(newComment));
          return newComment;
        });
    }

    const localNewCommentId = nanoid();
    const localNewComment = Object.assign({}, comment, {id: localNewCommentId});

    this._store.setItem(localNewComment.id, CommentsModel.adaptToServer(localNewComment));

    return Promise.resolve(localNewComment);
  }

  deleteComment(comment) {

    console.log(comment)

    if (CommentsProvider.isOnline()) {
      return this._api.deleteComment(comment)
        .then(() => this._store.removeItem(comment.id));
    }

    this._store.removeItem(comment.id);

    return Promise.resolve();
  }

  sync() {
    if (CommentsProvider.isOnline()) {
      const storeComments = Object.values(this._store.getItems());

      return this._api.sync(storeComments)
        .then((response) => {

          // const createdComments = getSyncedComments(response.created);
          const updatedComment = getSyncedComments(response.updated);

          // const items = createStoreStructure([...createdComments, ...updatedComment]);
          const items = createStoreStructure([...updatedComment]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
