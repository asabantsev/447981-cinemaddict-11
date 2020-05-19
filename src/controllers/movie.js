import FilmCardComponent from '../components/film-card/film-card.js';
import FilmsDetailsComponent from '../components/films-details/films-details.js';
import {render, remove, RenderPosition} from "../utils/render.js";
import {onEscKeyDown} from '../utils/common.js';

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmsDetailsComponent(film);
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);

    this._filmCardComponent.setClickHandler(() => {
      this.renderFilmDetails(this._filmDetailsComponent);
    });
  }

  renderFilmDetails() {
    const siteFooterElement = document.querySelector(`.footer`);

    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);

    this._filmDetailsComponent.setCloseButtonHandler(() => {
      remove(this._filmDetailsComponent);
    });
  }
}
