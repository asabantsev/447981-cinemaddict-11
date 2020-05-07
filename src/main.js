import HeaderProfileComponent from './components/header-profile.js';
import SiteMenuComponent from './components/site-menu.js';
import PageController from "./controllers/page.js";
import {generateMenuItems} from './mock/menu.js';
import {render, RenderPosition} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const menuItems = generateMenuItems();
render(siteMainElement, new SiteMenuComponent(menuItems), RenderPosition.BEFOREEND);

const pageController = new PageController();
pageController.render();
