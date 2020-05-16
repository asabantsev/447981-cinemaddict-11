import {SortType} from "../../../consts/consts";

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

let sortedFilms = [];

const getSortedFilms = {
  [SortType.DATE]: (films, from, to) => {
    sortedFilms = films.slice().sort((newerDate, olderDate) => olderDate.year - newerDate.year);
    return sortedFilms.slice(from, to);
  },
  [SortType.RATING]: (films, from, to) => {
    sortedFilms = films.slice().sort((lowerRate, higherRate) => higherRate.rating - lowerRate.rating);
    return sortedFilms.slice(from, to);
  },
  [SortType.DEFAULT]: (films, from, to) => {
    sortedFilms = films.slice();
    return sortedFilms.slice(from, to);
  },
};

export {createSortTemplate, getSortedFilms};
