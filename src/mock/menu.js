const menuItemLinks = [
  `all`, `watchlist`, `history`, `favorites`
];

const menuItemNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateMenuItems = () => {
  return menuItemLinks.map((it, i) => {
    return {
      link: it,
      name: menuItemNames[i],
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateMenuItems};
