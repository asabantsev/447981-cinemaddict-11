import FilmCardComponent from '../components/film-card/film-card.js';
import FilmsDetailsComponent from '../components/films-details/films-details.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmsDetailsComponent(film);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(() => {
      this.renderFilmDetails(this._filmDetailsComponent);
    });

    this._filmCardComponent.setControlsChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        controlType: !film.controlType,
      }));
    });

    this._filmDetailsComponent.setControlsChangeHandler(() => {
      this._filmCardComponent.rerender();
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onFilmDetailsClose();
    }
  }

  renderFilmDetails() {
    const siteFooterElement = document.querySelector(`.footer`);

    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);

    this._filmDetailsComponent.setCloseButtonHandler(() => {
      remove(this._filmDetailsComponent);
    });
  }

  _onFilmDetailsClose() {
    remove(this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
  }
}
