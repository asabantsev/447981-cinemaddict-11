import {filmFilmsList} from '../../../utils/render-films.js';

const createExtraFilmsBlockTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

const sortRules = {
  TOP_RATED: (first, second) => second.rate - first.rate,
  MOST_COMMENTED: (first, second) => second.comments.length - first.comments.length,
};

const topRatedList = [...filmFilmsList].sort(sortRules.TOP_RATED);
const mostComentedList = [...filmFilmsList].sort(sortRules.MOST_COMMENTED);

export {createExtraFilmsBlockTemplate, topRatedList, mostComentedList};
