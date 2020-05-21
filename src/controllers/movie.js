import FilmCardComponent from '../components/film-card/film-card.js';
import FilmsDetailsComponent from '../components/films-details/films-details.js';
import {render, remove, RenderPosition} from "../utils/render.js";
import {onEscKeyDown} from '../utils/common.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

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

    this._filmCardComponent.setControlsChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        controlType: !film.controlType,
      }));
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
