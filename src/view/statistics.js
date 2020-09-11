import ChartDataLabels from 'chartjs-plugin-datalabels';
import {sortedGenres, topGenre, userRank, totalDuration} from '../utils/statistics.js';
import SmartView from './smart.js';
import Chart from 'chart.js';
// import moment from "moment";


const BAR_HEIGHT = 50;

const Filters = {
  ALL: `all-time`,
  TODAY: `today`,
  MONTH: `month`,
  WEEK: `week`,
  YEAR: `year`
};

const renderDurationTemplate = (watched) => {
  const time = totalDuration(watched);
  return (`<p class="statistic__item-text">${time[0]} <span class="statistic__item-description">h</span> ${time[1]} <span class="statistic__item-description">m</span></p>`);
};

const renderFilterTemplate = (currentFilter) => {
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"} ${currentFilter === Filters.ALL ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"} ${currentFilter === Filters.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentFilter === Filters.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentFilter === Filters.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentFilter === Filters.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>`
  );
};

const renderChart = (statisticCtx, data) => {
  const watched = data.filter((item) => item.isWatched);
  const amountWatchedGenres = sortedGenres(watched);

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

const createStatisticsTemplate = (data = {}, currentFilter) => {
  const watched = data.filter((item) => item.isWatched);

  const watchedAmount = watched.length;

  const filtersTemplate = renderFilterTemplate(currentFilter);
  const rankTemplate = userRank(watched);
  const topGenreTemplate = topGenre(watched);
  const durationTemplate = renderDurationTemplate(watched);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankTemplate}</span>
      </p>

      ${filtersTemplate}

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
  constructor(data, currentFilter) {
    super();
    this._data = data;
    this._currentFilter = currentFilter;
    this._setCharts();

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatisticsTemplate(this._data, this._currentFilter);
  }

  _setCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * 5;
    this._Cart = renderChart(statisticCtx, this._data);
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
