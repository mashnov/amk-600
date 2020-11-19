import cloneDeep from 'lodash/cloneDeep';

import { AUTH, LOGGER } from '~/store/types';

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

const REQUEST_LOGGER_START = `logger/${LOGGER.REQUEST_START}`;
const REQUEST_LOGGER_STOP = `logger/${LOGGER.REQUEST_STOP}`;

const getDefaultState = () => (cloneDeep(defaultState));

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
    commit(MODULE.MUTATE_FETCH_IS_LOCK, true);
    dispatch(REQUEST_LOGGER_START, MODULE.FETCH_CHART_DATA, { root: true });
    const { successes, token, data } = await Api.FETCH_CHART_DATA({ userToken, reportTypes, reportRange });
    dispatch(REQUEST_LOGGER_STOP, MODULE.FETCH_CHART_DATA, { root: true });
    commit(MODULE.MUTATE_FETCH_IS_LOCK, false);
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
  [MODULE.CHANGE_CHART_AXIS]({ commit, state: { reportTypes, axis } }) {
    const axisLimit = axis.length + 1;
    const enabledAxis = reportTypes.length;
    const newAxis = axisLimit > enabledAxis ? [] : reportTypes.slice(0, axisLimit);
    commit(MODULE.MUTATE_CHART_AXIS, newAxis);
  },
  [MODULE.SET_CHART_FILL]({ commit, state: { isFill } }) {
    commit(MODULE.MUTATE_CHART_FILL, !isFill);
  },
  [MODULE.RESET_STATE]({ commit }) {
    const { reportRange, reportTypes, chartData } = getDefaultState();
    commit(MODULE.MUTATE_REPORT_RANGE, reportRange);
    commit(MODULE.MUTATE_REPORT_TYPES, reportTypes);
    commit(MODULE.MUTATE_CHART_DATA, chartData);
    removeUserReportTypes();
    removeUserReportRange();
  },
};
