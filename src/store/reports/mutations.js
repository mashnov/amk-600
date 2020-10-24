import MODULE from './types';

export default {
  [MODULE.MUTATE_REPORT_TYPES]: (state, reportTypes) => {
    state.reportTypes = reportTypes;
  },
  [MODULE.MUTATE_CHART_DATA]: (state, chartData) => {
    state.chartData = chartData;
  },
};
