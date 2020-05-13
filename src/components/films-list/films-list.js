import AbstractComponent from '../abstract-component.js';
import {createFilmsListTemplate} from './templates/films-list.js';

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
