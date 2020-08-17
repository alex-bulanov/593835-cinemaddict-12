import {getRandomInteger} from "../utils.js";
import {POSTERS} from "../const.js";


const string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const generateDescriptions = () => {
  const descriptions = string.split(`.`).filter((item) => {
    return item !== ``;
  });

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateRating = () => {
  return getRandomInteger(0, 90) / 10;
};

const generateDate = () => {
  const maxYearsGap = new Date().getFullYear();
  const minYearsGap = 1900;

  return getRandomInteger(minYearsGap, maxYearsGap);
};

export const createFilmDataTemplate = () => {
  let cuurentPoster = POSTERS[getRandomInteger(0, 6)];

  return {
    title: `Predator-${getRandomInteger(0, 5)}`,
    poster: cuurentPoster,

    posterFull: cuurentPoster,
    originalTitle: `Best Film Ever`,
    director: `Tom`,
    writers: [`Tom`, `Johns`],
    actors: [`Bob`, `Rob`, `Tod`, `John Wayne`],
    dateOfRelease: generateDate(),
    country: `USA`,
    ageRating: `${getRandomInteger(0, 18)}+`,
    genres: [`Film-Noir`, `Drama`, `Musical`],
    description: generateDescriptions(),
    rating: generateRating(),
    dateOfProduction: generateDate(),
    runtime: `1h 55m`,
    genre: `Musical`,
    commentsCount: getRandomInteger(0, 10),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
