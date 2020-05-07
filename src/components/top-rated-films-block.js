import AbstractComponent from './abstract-component.js';

const createTopRatedFilmsBlockTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRatedFilmsBlock extends AbstractComponent {
  getTemplate() {
    return createTopRatedFilmsBlockTemplate();
  }
}
