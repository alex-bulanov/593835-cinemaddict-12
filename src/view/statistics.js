import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getSortedByGenres, getTopGenre, getUserRank, getTotalDuration} from '../utils/statistics.js';
import SmartView from './smart.js';
import Chart from 'chart.js';

const BAR_HEIGHT = 50;

const renderDurationTemplate = (movies) => {
  const time = getTotalDuration(movies);
  return (`<p class="statistic__item-text">${time[0]} <span class="statistic__item-description">h</span> ${time[1]} <span class="statistic__item-description">m</span></p>`);
};

const renderChart = (statisticCtx, movie) => {
  const amountWatchedGenres = getSortedByGenres(movie);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(amountWatchedGenres),
      datasets: [{
        data: Object.values(amountWatchedGenres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createFilterItemTemplate = (filter, currentFilter) => {
  const {type, name} = filter;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentFilter ? `checked` : ``}>
    <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`
  );
};

const createStatisticsTemplate = (filtersItems, currentFilter) => {
  const filtersItemsTemplate = filtersItems.map((filter) => createFilterItemTemplate(filter, currentFilter)).join(``);
  const currentFilterItem = filtersItems.find((item) => item.type === currentFilter);
  const allFilterItem = filtersItems.find((item) => item.type === `all-time`);
  const watchedAmount = currentFilterItem.movie.length;
  const rankTemplate = getUserRank(allFilterItem.movie);
  const topGenreTemplate = getTopGenre(currentFilterItem.movie);
  const durationTemplate = renderDurationTemplate(currentFilterItem.movie);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankTemplate}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filtersItemsTemplate}
      </form>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedAmount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          ${durationTemplate}
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenreTemplate}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends SmartView {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._setCharts();
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatisticsTemplate(this._filters, this._currentFilter);
  }

  _setCharts() {
    const currentFilterItem = this._filters.find((item) => item.type === this._currentFilter);
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * 5;
    this._Cart = renderChart(statisticCtx, currentFilterItem.movie);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
