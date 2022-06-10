import {getRandomInteger} from '../utils/common.js';

export const getRandomProfileRating = () => {
  const randomRating = getRandomInteger(0, 30);

  switch(true) {
    case randomRating > 0 && randomRating <= 10:
      return 'Novice';
    case randomRating > 10 && randomRating <= 20:
      return 'Fan';
    case randomRating > 20:
      return 'Movie Buff';
    default:
      return randomRating;
  }
};

