const defaultReportRange = process.env.VUE_APP_DEFAULT_CHART_PERIOD;
const defaultReportTypes = process.env.VUE_APP_DEFAULT_CHART_TYPES.split(' ');

export default {
  fetchIsLock: false,
  reportTypes: defaultReportTypes,
  reportRange: defaultReportRange,
  chartData: {
    temperature: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    humidity: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    pressure: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    rain: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windVSpeed: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windHSpeed: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windDirection: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
  },
};
