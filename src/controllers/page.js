import SortComponent from '../components/sort/sort.js';
import FilmsBlockComponent from '../components/films-block/films-block.js';
import FilmsListComponent from '../components/films-list/films-list.js';
import NoFilmsComponent from '../components/no-films/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button.js';
import ExtraFilmsBlockComponent from '../components/extra-films/extra-films.js';
import {renderFilms} from '../utils/render-films.js';
import {topRatedList, mostComentedList} from '../components/extra-films/templates/extra-films.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {Page, ExtraFilmsName} from '../consts/consts.js';
import {getSortedFilms} from '../components/sort/templates/sort.js';

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsBlockComponent = new FilmsBlockComponent();
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmListComponent = new FilmsListComponent();
    this._topRatedComponent = new ExtraFilmsBlockComponent(ExtraFilmsName.TOP);
    this._mostComentedComponent = new ExtraFilmsBlockComponent(ExtraFilmsName.MOST);

    this._films = [];
    this._showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;
  }

  renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._films.length > Page.SHOWING_FILMS_COUNT_ON_START) {
      render(this._filmListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.setClickHandler(() => {
        this._onButtonShowClick();
      });
    }
  }

  renderFilmList(container) {

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);

    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    renderFilms(this._films.slice(0, this._showingFilmsCount), filmListContainer);

    this.renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;
      const sortedFilms = getSortedFilms[sortType](this._films, 0, this._showingFilmsCount);

      filmListContainer.innerHTML = ``;

      renderFilms(sortedFilms, filmListContainer);
      this.renderShowMoreButton();
    });
  }

  renderExtraFilmLists(container) {
    render(container, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._mostComentedComponent, RenderPosition.BEFOREEND);

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);

    renderFilms(topRatedList.slice(0, Page.TOP_RATED_FILMS_COUNT), topRatedContainer);
    renderFilms(mostComentedList.slice(0, Page.MOST_COMMENTED_FILMS_COUNT), mostComentedContainer);
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    if (Page.MAIN_FILMS_COUNT === 0) {
      render(container, this._noFilmComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    render(this._filmListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this.renderFilmList(container, this._films);
    this.renderExtraFilmLists(container);
  }

  _onButtonShowClick() {
    let prevCardsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + Page.SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms[this._sortComponent.getSortType()](this._films, prevCardsCount, this._showingFilmsCount);

    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);
    renderFilms(sortedFilms, filmListContainer);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }
}
