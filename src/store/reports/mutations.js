import MODULE from './types';

export default {
  [MODULE.MUTATE_REPORT_TYPES]: (state, reportTypes) => {
    state.reportTypes = reportTypes;
  },
};
