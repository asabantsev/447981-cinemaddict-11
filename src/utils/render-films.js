import {generateFilms} from "../mock/film.js";
import {Page} from "../consts/consts.js";
import MovieController from "../controllers/movie.js";

const filmFilmsList = generateFilms(Page.MAIN_FILMS_COUNT);

const renderFilms = (films, container, onDataChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(film);

    return movieController;
  });
};

export {filmFilmsList, renderFilms};
