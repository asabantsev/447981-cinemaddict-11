import {generateFilms} from "../mock/film.js";
import {Page} from "../consts/consts.js";
import MovieController from "../controllers/movie.js";

const filmFilmsList = generateFilms(Page.MAIN_FILMS_COUNT);

const renderFilm = (film, container, onDataChange, onViewChange) => {
  const movieController = new MovieController(container, onDataChange, onViewChange);
  movieController.render(film);

  return movieController;
};

const renderFilms = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => renderFilm(film, container, onDataChange, onViewChange));
};

export {filmFilmsList, renderFilms};
