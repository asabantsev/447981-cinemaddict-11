import HeaderProfileComponent from "./components/header-profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilmsBlockComponent from "./components/films-block.js";
import FilmsListComponent from "./components/films-list.js";
import FilmCardComponent from "./components/film-card.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import TopRatedFilmsBlockComponent from "./components/top-rated-films-block.js";
import MostCommentedFilmsBlockComponent from "./components/most-commented-films-block.js";
import FilmsDetailsComponent from "./components/films-details.js";
import {generateFilms} from "./mock/film.js";
import {generateMenuItems} from "./mock/menu.js";
import {render, RenderPosition} from "./utils.js";

const MAIN_FILMS_COUNT = 20;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new HeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);

const menuItems = generateMenuItems();
const films = generateFilms(MAIN_FILMS_COUNT);
const filmsTopRated = generateFilms(TOP_RATED_FILMS_COUNT);
const filmsMostCommented = generateFilms(MOST_COMMENTED_FILMS_COUNT);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsBlockComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsElement = document.querySelector(`.films`);
render(siteFilmsElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount).forEach((film) => render(mainFilmsContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND));

const mainFilmsList = siteFilmsElement.querySelector(`.films-list`);
render(mainFilmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => render(mainFilmsContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

render(siteFilmsElement, new TopRatedFilmsBlockComponent().getElement(), RenderPosition.BEFOREEND);
render(siteFilmsElement, new MostCommentedFilmsBlockComponent().getElement(), RenderPosition.BEFOREEND);

const extraFilmsElement = siteFilmsElement.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainer = extraFilmsElement[0].querySelector(`.films-list__container`);
filmsTopRated.forEach((film) => render(topRatedFilmsContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND));

const mostCommentedFilmsContainer = extraFilmsElement[1].querySelector(`.films-list__container`);
filmsMostCommented.forEach((film) => render(mostCommentedFilmsContainer, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND));

const renderFilmDetails = () => {
  const siteFooterElement = document.querySelector(`.footer`);
  render(siteFooterElement, new FilmsDetailsComponent(films[0]).getElement(), RenderPosition.AFTEREND);

  const filmDetails = document.querySelector(`.film-details`);
  const filmDetailsCloseButton = filmDetails.querySelector(`.film-details__close-btn`);
  filmDetailsCloseButton.addEventListener(`click`, () => {
    filmDetails.remove();
  });
};

const filmCardTitle = mainFilmsContainer.querySelectorAll(`.film-card__title`);
filmCardTitle.forEach((title) => {
  title.addEventListener(`click`, () => {
    renderFilmDetails();
  });
});

const filmCardPoster = mainFilmsContainer.querySelectorAll(`.film-card__poster`);
filmCardPoster.forEach((poster) => {
  poster.addEventListener(`click`, () => {
    renderFilmDetails();
  });
});

const filmCardComments = mainFilmsContainer.querySelectorAll(`.film-card__comments`);
filmCardComments.forEach((comments) => {
  comments.addEventListener(`click`, () => {
    renderFilmDetails();
  });
});
