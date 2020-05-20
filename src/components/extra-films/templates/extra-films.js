import {filmFilmsList} from '../../../utils/render-films.js';

const createExtraFilmsBlockTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

const topRatedList = [...filmFilmsList].slice().sort((first, second) => {
  return second.rate - first.rate;
});

const mostComentedList = [...filmFilmsList].slice().sort((first, second) => {
  return second.comments.length - first.comments.length;
});

export {createExtraFilmsBlockTemplate, topRatedList, mostComentedList};
