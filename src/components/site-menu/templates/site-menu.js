import {Filters} from "./../../../consts/consts.js";

const getActiveClass = (filter) => filter.isActive ? `main-navigation__item--active` : ``;
const showAmount = (filter) => filter.name === `All movies` ? `` : ` <span class="main-navigation__item-count">${filter.count}</span>`;

const createSiteMenuItemMarkup = (filter) => {
  return (
    `<a href="#all" class="main-navigation__item ${getActiveClass(filter)}">${filter.name}${showAmount(filter)}</a>`
  );
};

const createSiteMenuMarkup = () => {
  return Filters.map(createSiteMenuItemMarkup).join(`\n`);
};

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createSiteMenuMarkup()}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createSiteMenuTemplate};
