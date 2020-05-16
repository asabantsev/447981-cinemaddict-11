import HeaderProfileComponent from './components/header-profile/header-profile.js';
import SiteMenuComponent from './components/site-menu/site-menu.js';
// import SortComponent from './components/sort/sort.js';
import PageController from "./controllers/page.js";
import {render, RenderPosition} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
// render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const pageController = new PageController();
pageController.render();
