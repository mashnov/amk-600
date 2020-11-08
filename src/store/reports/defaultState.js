const defaultReportRange = process.env.VUE_APP_CHART_DEFAULT_PERIOD;
const defaultReportTypes = process.env.VUE_APP_CHART_DEFAULT_TYPES.split(' ');

export default {
  fetchIsLock: false,
  isFill: true,
  isScaled: true,
  reportTypes: defaultReportTypes,
  reportRange: defaultReportRange,
  chartData: {
    temperature: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    humidity: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    pressure: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    rain: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windVSpeed: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windHSpeed: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
    windDirection: {
      hour: [],
      day: [],
      week: [],
      month: [],
      year: [],
    },
  },
};
