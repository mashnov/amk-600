import MODULE from './types';

export default {
  [MODULE.MUTATE_REPORT_TYPES]: (state, reportTypes) => {
    state.reportTypes = reportTypes;
  },
  [MODULE.MUTATE_CHART_DATA]: (state, chartData) => {
    state.chartData = chartData;
  },
  [MODULE.MUTATE_REPORT_RANGE]: (state, reportRange) => {
    state.reportRange = reportRange;
  },
  [MODULE.MUTATE_FETCH_IS_LOCK]: (state, fetchIsLock) => {
    state.fetchIsLock = fetchIsLock;
  },
  [MODULE.MUTATE_CHART_FILL]: (state, isFill) => {
    state.isFill = isFill;
  },
  [MODULE.MUTATE_CHART_SCALED]: (state, isScaled) => {
    state.isScaled = isScaled;
  },
};
