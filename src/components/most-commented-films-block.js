import {createElement} from "../utils.js";

const createMostCommentedFilmsBlockTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class MostCommentedFilmsBlock {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsBlockTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
