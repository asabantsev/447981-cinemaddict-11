import AbstractComponent from '../abstract-component.js';
import {createSiteMenuTemplate} from './templates/site-menu.js';

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
