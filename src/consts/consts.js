export const Page = {
  MAIN_FILMS_COUNT: 20,
  TOP_RATED_FILMS_COUNT: 2,
  MOST_COMMENTED_FILMS_COUNT: 2,
  SHOWING_FILMS_COUNT_ON_START: 5,
  SHOWING_FILMS_COUNT_BY_BUTTON: 5,
};

export const ExtraFilmsName = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

export const Filters = [
  {
    name: `All movies`,
    count: ``,
    isActive: true,
  },
  {
    name: `Watchlist`,
    count: Math.floor(Math.random() * 10),
    isActive: false,
  },
  {
    name: `History`,
    count: Math.floor(Math.random() * 10),
    isActive: false,
  },
  {
    name: `Favorites`,
    count: Math.floor(Math.random() * 10),
    isActive: false,
  }
];
