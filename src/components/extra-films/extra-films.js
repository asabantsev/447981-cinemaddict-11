import {createExtraFilmsBlockTemplate} from "./templates/extra-films.js";
import AbstractComponent from '../abstract-component.js';

export default class ExtraFilmsBlock extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsBlockTemplate(this._title);
  }
}
