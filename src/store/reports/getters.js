import MODULE from './types';

export default {
  [MODULE.GET_REPORT_TYPES]: ({ reportTypes }) => reportTypes,
  [MODULE.GET_REPORT_RANGE]: ({ reportRange }) => reportRange,
  [MODULE.GET_CHART_DATA]: ({ chartData }) => chartData,
  [MODULE.GET_FETCH_IS_LOCK]: ({ fetchIsLock }) => fetchIsLock,
  [MODULE.GET_CHART_FILL]: ({ isFill }) => isFill,
  [MODULE.GET_CHART_AXIS]: ({ axis }) => axis,
};
