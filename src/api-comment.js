import CommentsModel from "./model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class ApiComment {
  constructor(endPoint, authorization, movieId) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._movieId = movieId;
  }

  getComments() {
    return this._load({url: `comments`})
      .then(ApiComment.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  updateComments(comment) {
    return this._load({
      url: `comments`,
      method: Method.PUT,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComment.toJSON)
      .then(CommentsModel.adaptToClient);
  }

  // ------------------

  addComment(comment) {
    return this._load({
      url: `comments`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComment.toJSON)
      .then(CommentsModel.adaptToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });
  }

  // ------------------

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}/${this._movieId}`, {method, body, headers})
      .then(ApiComment.checkStatus)
      .catch(ApiComment.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
