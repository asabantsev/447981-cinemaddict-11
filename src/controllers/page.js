import FilmsBlockComponent from '../components/films-block.js';
import FilmsListComponent from '../components/films-list.js';
import FilmCardComponent from '../components/film-card.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import TopRatedFilmsBlockComponent from '../components/top-rated-films-block.js';
import MostCommentedFilmsBlockComponent from '../components/most-commented-films-block.js';
import FilmsDetailsComponent from '../components/films-details.js';
import {generateFilms} from '../mock/film.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

// render page
const renderPage = () => {

  // film list
  const MAIN_FILMS_COUNT = 20;
  const TOP_RATED_FILMS_COUNT = 2;
  const MOST_COMMENTED_FILMS_COUNT = 2;
  const SHOWING_FILMS_COUNT_ON_START = 5;
  const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

  const siteMainElement = document.querySelector(`.main`);
  render(siteMainElement, new FilmsBlockComponent(), RenderPosition.BEFOREEND);
  const siteFilmsElement = document.querySelector(`.films`);
  render(siteFilmsElement, new FilmsListComponent(), RenderPosition.BEFOREEND);

  const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);

  const renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardComponent(film);

    filmCardComponent.setFilmCardTitleHandler(() => {
      renderFilmDetails();
    });

    filmCardComponent.setFilmCardPosterHandler(() => {
      renderFilmDetails();
    });

    filmCardComponent.setFilmCardCommentsHandler(() => {
      renderFilmDetails();
    });

    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  };

  const films = generateFilms(MAIN_FILMS_COUNT);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount).forEach((film) => renderFilmCard(film, mainFilmsContainer));

  const mainFilmsList = siteFilmsElement.querySelector(`.films-list`);

  if (MAIN_FILMS_COUNT === 0) {
    render(mainFilmsList, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    remove(showMoreButtonComponent);
  }

  // show more btn
  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(mainFilmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => renderFilmCard(film, mainFilmsContainer));

    if (showingFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });

  // extra films
  render(siteFilmsElement, new TopRatedFilmsBlockComponent(), RenderPosition.BEFOREEND);
  render(siteFilmsElement, new MostCommentedFilmsBlockComponent(), RenderPosition.BEFOREEND);

  const extraFilmsElement = siteFilmsElement.querySelectorAll(`.films-list--extra`);

  const topRatedFilmsContainer = extraFilmsElement[0].querySelector(`.films-list__container`);
  const filmsTopRated = generateFilms(TOP_RATED_FILMS_COUNT);
  filmsTopRated.forEach((film) => renderFilmCard(film, topRatedFilmsContainer));

  const mostCommentedFilmsContainer = extraFilmsElement[1].querySelector(`.films-list__container`);
  const filmsMostCommented = generateFilms(MOST_COMMENTED_FILMS_COUNT);
  filmsMostCommented.forEach((film) => renderFilmCard(film, mostCommentedFilmsContainer));

  // film details
  const renderFilmDetails = () => {
    const siteFooterElement = document.querySelector(`.footer`);

    const filmDetailsComponent = new FilmsDetailsComponent(films[0]);

    render(siteFooterElement, filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);

    filmDetailsComponent.setCloseButtonHandler(() => {
      remove(filmDetailsComponent);
    });
  };

};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render() {
    renderPage();
  }
}
