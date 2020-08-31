import {render, RenderPosition, remove} from "../utils/render.js";
import FilmCommentView from "../view/comment.js";


export default class FilmComment extends SmartView {
  constructor(componentContainer, comment) {
    super();
    this._comment = comment;
    this._clickHandler = this._clickHandler.bind(this);
    this._componentContainer = componentContainer;
  }

  init() {
    this._comment = comment;
    this._filmCommentComponent = new FilmCommentView(this._comment);
    this._filmCommentComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._componentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmCommentComponent);
  }
}


