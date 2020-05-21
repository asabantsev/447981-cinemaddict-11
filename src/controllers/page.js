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
    this._showedFilmControllers = [];
    this._showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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

    const newFilms = renderFilms(this._films.slice(0, this._showingFilmsCount), filmListContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this.renderShowMoreButton();
  }

  renderExtraFilmLists(container) {
    render(container, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._mostComentedComponent, RenderPosition.BEFOREEND);

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);

    const newTopRatedFilms = renderFilms(topRatedList.slice(0, Page.TOP_RATED_FILMS_COUNT), topRatedContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newTopRatedFilms);

    const newMostRecomendedFilms = renderFilms(mostComentedList.slice(0, Page.MOST_COMMENTED_FILMS_COUNT), mostComentedContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newMostRecomendedFilms);
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
    const newFilms = renderFilms(sortedFilms, filmListContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;
    const sortedFilms = getSortedFilms[sortType](this._films, 0, this._showingFilmsCount);
    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    filmListContainer.innerHTML = ``;

    const newFilms = renderFilms(sortedFilms, filmListContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this.renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }
}
