import {NavType} from "../const";

export const nav = {
  [NavType.STATISTICS]: (films) => films,
  [NavType.ALL]: (films) => films,
  [NavType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist),
  [NavType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [NavType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
