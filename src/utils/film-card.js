const MINUTES_IN_HOUR = 60;
const MAX_SYMBOLS = 140;

const humanizeRuntime = (runtime) => {
  const hours = ~~(runtime / MINUTES_IN_HOUR);
  const minutes = runtime % MINUTES_IN_HOUR;

  return `${hours}h ${minutes}m`;
};

const getDescriptionPreview = (descriprion, maxSymbols = MAX_SYMBOLS, lastSymbol = '...') => (
  descriprion.length > maxSymbols
    ? `${descriprion.substring(0, 139)}${lastSymbol}`
    : descriprion
);

export {humanizeRuntime, getDescriptionPreview};
