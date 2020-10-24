import cloneDeep from 'lodash/cloneDeep';
import { AUTH } from '~/store/types';
import {
  getUserReportTypes,
  setUserReportTypes,
  removeUserReportTypes,
  getUserReportRange,
  setUserReportRange,
  removeUserReportRange,
} from '~/helpers/logger';

import MODULE from './types';
import defaultState from './defaultState';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

const copiedState = cloneDeep(defaultState);

export default {
  async [MODULE.INIT]({ commit }) {
    const reportRange = getUserReportRange();
    const reportTypes = getUserReportTypes();
    if (reportRange) {
      commit(MODULE.MUTATE_REPORT_RANGE, reportRange);
    }
    if (reportTypes) {
      commit(MODULE.MUTATE_REPORT_TYPES, reportTypes);
    }
  },
  async [MODULE.FETCH_CHART_DATA]({ rootGetters, state: { reportTypes, reportRange }, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token, data } = await Api.FETCH_CHART_DATA({ userToken, reportTypes, reportRange });
    if (successes) {
      commit(MODULE.MUTATE_CHART_DATA, data);
      dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    }
    return { successes };
  },
  [MODULE.SET_REPORT_TYPES]({ commit, state }, reportType) {
    const reportTypes = cloneDeep(state.reportTypes);
    const typeIndex = reportTypes.indexOf(reportType);
    if (typeIndex >= 0) {
      reportTypes.splice(typeIndex, 1);
    }
    else {
      reportTypes.push(reportType);
    }
    commit(MODULE.MUTATE_REPORT_TYPES, reportTypes);
    setUserReportTypes(reportTypes);
  },
  [MODULE.SET_REPORT_RANGE]({ commit }, reportRange) {
    commit(MODULE.MUTATE_REPORT_RANGE, reportRange);
    setUserReportRange(reportRange);
  },
  [MODULE.RESET_STATE]({ commit }) {
    const { reportRange, reportTypes, chartData } = copiedState;
    commit(MODULE.MUTATE_REPORT_RANGE, reportRange);
    commit(MODULE.MUTATE_REPORT_TYPES, reportTypes);
    commit(MODULE.MUTATE_CHART_DATA, chartData);
    removeUserReportTypes();
    removeUserReportRange();
  },
};
