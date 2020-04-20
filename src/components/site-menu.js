const createSiteMenuItemMarkup = (menuItem, isActive) => {
  const {link, name, count} = menuItem;

  return (`
    <a href="#${link}" class="main-navigation__item${isActive ? ` main-navigation__item--active">${name}</a>` : `">${name} <span class="main-navigation__item-count">${count}</span></a>`}
  `);
};

export const createSiteMenuTemplate = (menuItems) => {
  const siteMenuItemMarkup = menuItems.map((it, i) => createSiteMenuItemMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${siteMenuItemMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
