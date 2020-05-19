import SortComponent from '../components/sort/sort.js';
import FilmsBlockComponent from '../components/films-block/films-block.js';
import FilmsListComponent from '../components/films-list/films-list.js';
import NoFilmsComponent from '../components/no-films/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button.js';
import ExtraFilmsBlockComponent from '../components/extra-films/extra-films.js';
import {generateFilms} from '../mock/film.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {Page, ExtraFilmsName} from "../consts/consts.js";
import {getSortedFilms} from "../components/sort/templates/sort.js";
import MovieController from "./movie.js";

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsBlockComponent = new FilmsBlockComponent();
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedComponent = new ExtraFilmsBlockComponent(ExtraFilmsName.TOP);
    this._mostCommentedComponent = new ExtraFilmsBlockComponent(ExtraFilmsName.MOST);

    this._films = [];
    this._showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;
  }

  renderFilms(filmListElement, films) {
    // const films = generateFilms(Page.MAIN_FILMS_COUNT);
    return films.map((film) => {
      const movieController = new MovieController(filmListElement);
      movieController.render(film);
      return movieController;
    });
  }

  renderExtraFilms() {
    const siteFilmsElement = document.querySelector(`.films`);
    render(siteFilmsElement, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(siteFilmsElement, this._mostCommentedComponent, RenderPosition.BEFOREEND);

    const extraFilmsElement = siteFilmsElement.querySelectorAll(`.films-list--extra`);
    const topRatedFilmsContainer = extraFilmsElement[0].querySelector(`.films-list__container`);
    const mostCommentedFilmsContainer = extraFilmsElement[1].querySelector(`.films-list__container`);

    const filmsTopRated = generateFilms(Page.TOP_RATED_FILMS_COUNT);
    const filmsMostCommented = generateFilms(Page.MOST_COMMENTED_FILMS_COUNT);

    // filmsTopRated.forEach((film) => this.renderFilmCard(film, topRatedFilmsContainer));
    this.renderFilms(topRatedFilmsContainer, filmsTopRated);
    // filmsMostCommented.forEach((film) => this.renderFilmCard(film, mostCommentedFilmsContainer));
    this.renderFilms(mostCommentedFilmsContainer, filmsMostCommented);
  }

  onShowMoreButton() {
    const siteFilmsElement = document.querySelector(`.films`);
    const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);

    const films = generateFilms(Page.MAIN_FILMS_COUNT);
    let showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;

    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + Page.SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => this.renderFilmCard(film, mainFilmsContainer));

    if (showingFilmsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  onSortTypeChange(sortType) {
    const siteFilmsElement = document.querySelector(`.films`);
    const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);

    const films = generateFilms(Page.MAIN_FILMS_COUNT);
    let showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms[sortType](films, 0, showingFilmsCount);
    mainFilmsContainer.innerHTML = ``;
    // sortedFilms.forEach((film) => this.renderFilmCard(film, mainFilmsContainer));
    this.renderFilms(mainFilmsContainer, sortedFilms);
  }

  render() {
    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBlockComponent, RenderPosition.BEFOREEND);
    const siteFilmsElement = document.querySelector(`.films`);
    render(siteFilmsElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);
    const mainFilmsList = siteFilmsElement.querySelector(`.films-list`);

    if (Page.MAIN_FILMS_COUNT === 0) {
      render(mainFilmsList, this._noFilmsComponent, RenderPosition.BEFOREEND);
      remove(this._showMoreButtonComponent);
    }

    const films = generateFilms(Page.MAIN_FILMS_COUNT);
    // let showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;

    // const renderFilms = (filmListElement) => {
    //   return films.map((film) => {
    //     const movieController = new MovieController(filmListElement);
    //     movieController.render(film);
    //     return movieController;
    //   });
    // };

    this.renderFilms(mainFilmsContainer, films);

    // films.slice(0, showingFilmsCount).forEach((sortedFilms) => this.renderFilmCard(sortedFilms, mainFilmsContainer));

    this._sortComponent.setSortTypeChangeHandler(this.onSortTypeChange.bind(this));

    render(mainFilmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this.onShowMoreButton.bind(this));

    this.renderExtraFilms();
  }
}
