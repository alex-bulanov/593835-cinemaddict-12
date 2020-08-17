export const compareYear = (filmA, filmB) => {
  return filmB.dateOfProduction - filmA.dateOfProduction;
};

export const compareRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
