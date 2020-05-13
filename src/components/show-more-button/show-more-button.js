import AbstractComponent from '../abstract-component.js';
import {createShowMoreButtonTemplate} from './templates/show-more-button.js';

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
