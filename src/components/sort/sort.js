import AbstractComponent from '../abstract-component.js';
import {createSortTemplate} from './templates/sort.js';
import {SortType} from "../../consts/consts.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this.currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this.currenSortType;
  }

  onSortTypeChange(handler, evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const sortType = evt.target.dataset.sortType;

    if (this.currenSortType === sortType) {
      return;
    }

    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

    evt.target.classList.add(`sort__button--active`);

    this.currenSortType = sortType;

    handler(this.currenSortType);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this.onSortTypeChange.bind(this, handler));
  }
}
