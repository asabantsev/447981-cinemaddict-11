import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilmsBlockTemplate} from "./components/films-block.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createTopRatedFilmsBlockTemplate} from "./components/top-rated-films-block.js";
import {createMostCommentedFilmsBlockTemplate} from "./components/most-commented-films-block.js";
import {createFilmsDetailsTemplate} from "./components/films-details.js";
import {generateFilms} from "./mock/film.js";
import {generateMenuItems} from "./mock/menu.js";

const MAIN_FILMS_COUNT = 20;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

// Функция рендеринга
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Рендеринг элементов
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);

const menuItems = generateMenuItems();
const films = generateFilms(MAIN_FILMS_COUNT);
const filmsTopRated = generateFilms(TOP_RATED_FILMS_COUNT);
const filmsMostCommented = generateFilms(MOST_COMMENTED_FILMS_COUNT);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(menuItems), `beforeend`);
render(siteMainElement, createFilmsBlockTemplate(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);
render(siteFilmsElement, createFilmsListTemplate(), `beforeend`);

const mainFilmsContainer = siteFilmsElement.querySelector(`.films-list__container`);
films.forEach((film) => render(mainFilmsContainer, createFilmCardTemplate(film), `beforeend`));

const mainFilmsList = siteFilmsElement.querySelector(`.films-list`);
render(mainFilmsList, createShowMoreButtonTemplate(), `beforeend`);

render(siteFilmsElement, createTopRatedFilmsBlockTemplate(), `beforeend`);
render(siteFilmsElement, createMostCommentedFilmsBlockTemplate(), `beforeend`);

const extraFilmsElement = siteFilmsElement.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainer = extraFilmsElement[0].querySelector(`.films-list__container`);
filmsTopRated.forEach((film) => render(topRatedFilmsContainer, createFilmCardTemplate(film), `beforeend`));

const mostCommentedFilmsContainer = extraFilmsElement[1].querySelector(`.films-list__container`);
filmsMostCommented.forEach((film) => render(mostCommentedFilmsContainer, createFilmCardTemplate(film), `beforeend`));

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmsDetailsTemplate(films[0]), `afterend`);

const filmDetails = document.querySelector(`.film-details`);
const filmDetailsCloseButton = filmDetails.querySelector(`.film-details__close-btn`);

filmDetailsCloseButton.addEventListener(`click`, () => {
  filmDetails.classList.add(`visually-hidden`);
});

const filmsCardTitle = mainFilmsContainer.querySelectorAll(`.film-card__title`);

filmsCardTitle.forEach((title) => {
  title.addEventListener(`click`, () => {
    filmDetails.classList.remove(`visually-hidden`);
  });
});
