import AbstractComponent from '../abstract-component.js';
import {createNoFilmsTemplate} from './templates/no-films.js';

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
