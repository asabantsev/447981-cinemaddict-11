import AbstractComponent from '../abstract-component.js';
import {createFilmsBlockTemplate} from './templates/films-block.js';

export default class FilmsBlock extends AbstractComponent {
  getTemplate() {
    return createFilmsBlockTemplate();
  }
}
