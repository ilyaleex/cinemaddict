import {getRandomInteger, getRandomFloatInteger} from '../utils.js';

const POINTS_SCALE = 10;

const TITLES = [
  'The Third Man',
  'Brief Encounter',
  'Lawrence of Arabia',
  'Great Expectations',
  'Kind Hearts and Coronets',
  'A Matter of Life and Death',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const GENRES = [
  'Musical',
  'Western',
  'Comedy',
];

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const getRandomRating = () => getRandomFloatInteger(0, POINTS_SCALE);

const getRandomElementFromArray = (list) => {
  const randomId = getRandomInteger(0, list.length - 1);

  return list[randomId];
};

const getRandomArrayLength = (list) => list.slice(0, getRandomInteger(1, list.length - 1));

export const generateComments = (val, id) => ({
  commentId: id,
  author: 'Ilya O\'Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  commentDate: '2019-05-11T16:12:32.554Z',
  emotion: getRandomElementFromArray(EMOTIONS)
});

export const generateFilmCard = (val, id) => ({
  id: id,
  comments: [1, 3],
  filmInfo: {
    title: getRandomElementFromArray(TITLES),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: getRandomRating(),
    poster: `images/posters/${getRandomElementFromArray(POSTERS)}`,
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
      'Kitano Kitano'
    ],
    actors: [
      'Morgan Freeman',
      'Freeman Freeman'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: getRandomArrayLength(GENRES),
    description: getRandomElementFromArray(DESCRIPTIONS)
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: true
  }
});

