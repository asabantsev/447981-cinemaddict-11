import {createFilmCardTemplate} from "./templates/film-card.js";
import AbstractComponent from '../abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setFilmCardTitleHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setFilmCardPosterHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setFilmCardCommentsHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
