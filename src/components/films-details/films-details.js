import AbstractComponent from '../abstract-component.js';
import {createFilmsDetailsTemplate} from './templates/films-details.js';


export default class FilmsDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmsDetailsTemplate(this._film);
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}
