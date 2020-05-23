import {ControlType} from '../../../consts/consts.js';

const isActive = (controlProperty) => controlProperty ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = ({title, rating, year, duration, genre, poster, description, commentsCount, inWatchlist, inHistory, inFavorites}) => {

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button data-control-type="${ControlType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(inWatchlist)}">Add to watchlist</button>
        <button data-control-type="${ControlType.HISTORY}" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(inHistory)}">Mark as watched</button>
        <button data-control-type="${ControlType.FAVORITES}" class="film-card__controls-item button film-card__controls-item--favorite ${isActive(inFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate, isActive};
