import SortComponent from '../components/sort/sort.js';
import FilmsBlockComponent from '../components/films-block/films-block.js';
import FilmsListComponent from '../components/films-list/films-list.js';
import FilmCardComponent from '../components/film-card/film-card.js';
import NoFilmsComponent from '../components/no-films/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button.js';
import ExtraFilmsBlockComponent from '../components/extra-films/extra-films.js';
import FilmsDetailsComponent from '../components/films-details/films-details.js';
import {generateFilms} from '../mock/film.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';
import {Page, ExtraFilmsName} from "../consts/consts.js";
import {getSortedFilms} from "../components/sort/templates/sort.js";

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  renderFilmDetails() {
    const siteFooterElement = document.querySelector(`.footer`);

    const films = generateFilms(Page.MAIN_FILMS_COUNT);
    const filmDetailsComponent = new FilmsDetailsComponent(films[0]);

    render(siteFooterElement, filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);

    filmDetailsComponent.setCloseButtonHandler(() => {
      remove(filmDetailsComponent);
    });
  }

  renderFilmCard(film, container) {
    const filmCardComponent = new FilmCardComponent(film);

    filmCardComponent.setFilmCardTitleHandler(this.renderFilmDetails.bind(this));
    filmCardComponent.setFilmCardPosterHandler(this.renderFilmDetails.bind(this));
    filmCardComponent.setFilmCardCommentsHandler(this.renderFilmDetails.bind(this));

    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  }

  renderExtraFilms() {
    const siteFilmsElement = document.querySelector(`.films`);
    render(siteFilmsElement, new ExtraFilmsBlockComponent(ExtraFilmsName.TOP), RenderPosition.BEFOREEND);
    render(siteFilmsElement, new ExtraFilmsBlockComponent(ExtraFilmsName.MOST), RenderPosition.BEFOREEND);

    const extraFilmsElement = siteFilmsElement.querySelectorAll(`.films-list--extra`);
    const topRatedFilmsContainer = extraFilmsElement[0].querySelector(`.films-list__container`);
    const mostCommentedFilmsContainer = extraFilmsElement[1].querySelector(`.films-list__container`);

    const filmsTopRated = generateFilms(Page.TOP_RATED_FILMS_COUNT);
    const filmsMostCommented = generateFilms(Page.MOST_COMMENTED_FILMS_COUNT);

    filmsTopRated.forEach((film) => this.renderFilmCard(film, topRatedFilmsContainer));
    filmsMostCommented.forEach((film) => this.renderFilmCard(film, mostCommentedFilmsContainer));
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
      remove(this.showMoreButtonComponent);
    }
  }

  render() {
    const siteMainElement = document.querySelector(`.main`);
    const sortComponent = new SortComponent();
    render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, new FilmsBlockComponent(), RenderPosition.BEFOREEND);
    const siteFilmsElement = document.querySelector(`.films`);
    render(siteFilmsElement, new FilmsListComponent(), RenderPosition.BEFOREEND);

    const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);
    const mainFilmsList = siteFilmsElement.querySelector(`.films-list`);

    if (Page.MAIN_FILMS_COUNT === 0) {
      render(mainFilmsList, new NoFilmsComponent(), RenderPosition.BEFOREEND);
      remove(showMoreButtonComponent);
    }

    const films = generateFilms(Page.MAIN_FILMS_COUNT);
    let showingFilmsCount = Page.SHOWING_FILMS_COUNT_ON_START;
    films.slice(0, showingFilmsCount).forEach((sortedFilms) => this.renderFilmCard(sortedFilms, mainFilmsContainer));

    sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedFilms = getSortedFilms[sortType](films, 0, showingFilmsCount);
      mainFilmsContainer.innerHTML = ``;
      sortedFilms.forEach((film) => this.renderFilmCard(film, mainFilmsContainer));
      render(mainFilmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);
    });

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(mainFilmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);
    showMoreButtonComponent.setClickHandler(this.onShowMoreButton.bind(this));

    this.renderExtraFilms();
  }
}
