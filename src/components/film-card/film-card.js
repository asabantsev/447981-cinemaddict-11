import {createFilmCardTemplate} from "./templates/film-card.js";
import AbstractSmartComponent from '../abstract-smart-component.js';

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._setControlsChangeHandler = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  recoveryListeners() {
    this.setControlsChangeHandler(this._setControlsChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setControlsChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      const controlType = evt.target.dataset.controlType;
      this._film[controlType] = this._film[controlType] ? false : true;
      this.rerender();

      handler();
    });
    this._setControlsChangeHandler = handler;
  }
}
