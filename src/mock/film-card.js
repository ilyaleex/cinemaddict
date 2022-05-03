import {getRandomInteger, getRandomPositiveFloat} from '../utils.js';
import {generateComment} from './comment.js';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other'
  ];

  const randomIndex = getRandomInteger(0, titles.length -1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg'
  ];

  const randomIndex = getRandomInteger(0, posters.length -1);

  return posters[randomIndex];
};

const generateName = () => {
  const authors = [
    'Ilya O\'Reilly',
    'Ilya NOT\'Really',
    'Tim Macoveev',
    'John Doe',
  ];

  const randomIndex = getRandomInteger(0, authors.length -1);

  return authors[randomIndex];
};


const generateFilmCard = () => ({
  comments: generateComment(),
  title: generateTitle(),
  totalRating: getRandomPositiveFloat(0, 10),
  poster: generatePoster(),
  ageRating: 18,
  director: 'Tom Ford',
  writers: [generateName()],
  actors: [generateName()],
  releaseDate: '2019-05-11T00:00:00.000Z',
  releaseCountry: 'Finland',
  runtime: 77,
  genre: ['Comedy', 'Drama'],
  description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re
                Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re
                Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re`,
  watchlist: true,
  alreadyWatched: true,
  watchingDate: '2019-04-12T16:12:32.554Z',
  favorite: true,
});

export {generateFilmCard, generateName};


