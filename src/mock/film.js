import {FormatDate} from '../consts/consts.js';
import moment from 'moment';

export const FIRST_RELEASE_DATE = [1920, 1, 1];

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
  day: `2 days ago`,
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

const formatDate = (date, format) => {
  return moment(date).format(format);
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
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
    year: formatDate(getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()), FormatDate.RELEASE_YEAR),
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
