import {getRandomInteger} from "../utils.js";
import {POSTERS, GENRES} from "../const.js";
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);


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

const generateDateRelease = () => {
  return new Date();
};

const generateGenres = () => {
  return GENRES.slice(0, getRandomInteger(0, GENRES.length));
};

const generateGenre = () => {
  return GENRES[getRandomInteger(0, GENRES.length - 1)];
};


const generateRunTime = () => {
  const maxRunTimeHour = 3;
  const minRunTimeHour = 0;
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(minRunTimeHour, maxRunTimeHour));

  return currentDate;
};

export const createFilmDataTemplate = () => {
  let cuurentPoster = POSTERS[getRandomInteger(0, 6)];

  return {
    id: generateId(),
    title: `Predator-${getRandomInteger(0, 5)}`,
    poster: cuurentPoster,

    posterFull: cuurentPoster,
    originalTitle: `Best Film Ever`,
    director: `Tom`,
    writers: [`Tom`, `Johns`],
    actors: [`Bob`, `Rob`, `Tod`, `John Wayne`],
    dateOfRelease: generateDateRelease(),
    country: `USA`,
    ageRating: `${getRandomInteger(0, 18)}+`,
    genres: generateGenres(),
    description: generateDescriptions(),
    rating: generateRating(),
    dateOfProduction: generateDate(),
    runtime: generateRunTime(),
    genre: generateGenre(),
    commentsCount: getRandomInteger(0, 10),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    // isWatched: Boolean(getRandomInteger(0, 1)),
    isWatched: false,
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
