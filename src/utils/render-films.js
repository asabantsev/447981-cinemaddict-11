import {generateFilms} from "../mock/film.js";
import {Page} from "../consts/consts.js";
import MovieController from "../controllers/movie.js";

const filmFilmsList = generateFilms(Page.MAIN_FILMS_COUNT);

const renderFilms = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export {filmFilmsList, renderFilms};
