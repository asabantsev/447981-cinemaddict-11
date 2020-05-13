import AbstractComponent from '../abstract-component.js';
import {createHeaderProfileTemplate} from './templates/header-profile.js';

export default class HeaderProfile extends AbstractComponent {
  getTemplate() {
    return createHeaderProfileTemplate();
  }
}
