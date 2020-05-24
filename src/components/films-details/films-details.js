import AbstractSmartComponent from '../abstract-smart-component.js';
import {createFilmsDetailsTemplate} from './templates/films-details.js';

export const EMOJI_SIZE = 55;

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

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
      .forEach((label) => {
        label.addEventListener(`click`, () => {
          this._onEmojiChange(label);
        });
      });
  }

  _onEmojiChange(label) {
    this._emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this._emojiRadio = this.getElement().querySelector(`input[id="${labelId}"]`);
    this._emojiRadio.setAttribute(`checked`, `checked`);

    this._emoji = this.getElement().querySelector(`input[id="${labelId}"]`).getAttribute(`value`);

    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, EMOJI_SIZE);
    emojiImage.setAttribute(`width`, EMOJI_SIZE);

    if (this._isEmoji === false) {
      this._emojiContainer.appendChild(emojiImage);
      this._isEmoji = true;
    } else {
      this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
      this._emojiContainer.appendChild(emojiImage);
    }
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._setCloseButtonHandler = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, handler);
    this._ControlChange = handler;
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
}
