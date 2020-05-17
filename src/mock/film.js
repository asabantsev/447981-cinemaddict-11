const Titles = [
  `Made For Each Other`,
  `The Great Flamarion`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance of Life`,
  `The Man with The Golden Arm`,
];

const Posters = [
  `made-for-each-other.png`,
  `the-great-flamarion.jpg`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const Description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
];

const Genres = [
  `Drama`,
  `Film-Noir`,
  `Mystery`
];

const Comments = [{
  emoji: `smile`,
  text: `Interesting setting and a good cast`,
  author: `Tim Macoveev`,
  day: `2019/12/31 23:59`,
}, {
  emoji: `sleeping`,
  text: `Booooooooooring`,
  author: `John Doe`,
  day: `2 days ago`,
}, {
  emoji: `puke`,
  text: `Very very old. Meh`,
  author: `John Doe`,
  day: `2 days ago`,
}, {
  emoji: `angry`,
  text: `Almost two hours? Seriously?`,
  author: `John Doe`,
  day: `Today`,
}];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(Titles),
    titleOriginal: `Original: The Great Flamarion`,
    rating: (Math.random() * 10).toFixed(1),
    age: `18+`,
    poster: getRandomArrayItem(Posters),
    description: getRandomArrayItem(Description),
    duration: `1h 55m`,
    directorName: `Anthony Mann`,
    writersName: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actorsName: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    country: `USA`,
    genre: getRandomArrayItem(Genres),
    genres: Genres,
    year: `19` + getRandomIntegerNumber(5, 10) + getRandomIntegerNumber(1, 10),
    releaseDate: `30 March 1945`,
    commentsCount: getRandomIntegerNumber(0, 5),
    comments: Comments,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
