import MODULE from './types';

export default {
  [MODULE.GET_REPORT_TYPES]: ({ reportTypes }) => reportTypes,
  [MODULE.GET_REPORT_RANGE]: ({ reportRange }) => reportRange,
  [MODULE.GET_CHART_DATA]: ({ chartData }) => chartData,
};
