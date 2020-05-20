import HeaderProfileComponent from './components/header-profile/header-profile.js';
import SiteMenuComponent from './components/site-menu/site-menu.js';
import PageController from "./controllers/page.js";
import {render, RenderPosition} from './utils/render.js';
import {filmFilmsList} from './utils/render-films.js';
import FilmsBlockComponent from './components/films-block/films-block.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const headerProfileComponent = new HeaderProfileComponent();
const navigationComponent = new SiteMenuComponent();
const filmContainerComponent = new FilmsBlockComponent();

render(header, headerProfileComponent, RenderPosition.BEFOREEND);
render(main, navigationComponent, RenderPosition.BEFOREEND);

render(main, filmContainerComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmContainerComponent);
pageController.render(filmFilmsList);
