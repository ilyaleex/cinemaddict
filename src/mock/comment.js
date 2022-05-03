import {getRandomInteger} from '../utils.js';
import {generateName} from './film-card.js';

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emotions.length -1);

  return emotions[randomIndex];
};

export const generateComment = () => ({
  author: generateName(),
  comment: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re
            Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re
            Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the re`,
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateEmotion(),
});


