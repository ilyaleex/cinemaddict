const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = ~~(Math.max(a, b));

  return ~~(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatInteger = (a = 0, b = 1, float = 1) => (Math.random() * (b - a) + a).toFixed(float);

const sortFilmsByCommentsAmount = (filmA, filmB) => (filmB.comments.length - filmA.comments.length);

export {
  getRandomInteger,
  getRandomFloatInteger,
  sortFilmsByCommentsAmount
};
