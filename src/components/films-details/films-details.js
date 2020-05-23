import AbstractSmartComponent from '../abstract-smart-component.js';
import {createFilmsDetailsTemplate} from './templates/films-details.js';

const emojiImageSize = {
  HEIGHT: 55,
  WIDTH: 55,
};

export default class FilmsDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._element = null;

    this._isEmoji = false;

    this._setCloseButtonHandler = null;
    this._setControlsChangeHandler = null;
    this._setEmojiChangeHandler = null;
  }

  getTemplate() {
    return createFilmsDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this.setCloseButtonHandler(this._setCloseButtonHandler);
    this.setControlsChangeHandler(this._setControlsChangeHandler);
    this.setEmojiChangeHandler();
  }

  rerender() {
    super.rerender();
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._setCloseButtonHandler = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => {
      this._ControlChange(evt);
      handler();
    });
    this._setControlsChangeHandler = handler;
  }

  _ControlChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    const controlType = evt.target.dataset.controlType;
    this._film[controlType] = !this._film[controlType];

    this.rerender();
  }

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((label) => {
      label.addEventListener(`click`, () => {
        this._onEmojiChange(label);
      });
    });
  }

  _onEmojiChange(label) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this.getElement().querySelector(`input[id="${labelId}"]`).setAttribute(`checked`, `checked`);
    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, emojiImageSize.HEIGHT);
    emojiImage.setAttribute(`width`, emojiImageSize.WIDTH);

    if (!this._isEmoji) {
      emojiContainer.append(emojiImage);
      this._isEmoji = true;
    } else {
      emojiContainer.querySelector(`img`).remove();
      emojiContainer.append(emojiImage);
    }
  }
}
