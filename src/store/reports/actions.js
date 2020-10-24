import cloneDeep from 'lodash/cloneDeep';
import MODULE from './types';
import { AUTH } from '~/store/types';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

export default {
  async [MODULE.FETCH_REPORT_FILE]({ rootGetters, dispatch }, { range }) {
    const token = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return await Api.FETCH_REPORT_FILE({ range, token });
  },
  async [MODULE.FETCH_CHART_DATA]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token, data } = await Api.FETCH_CHART_DATA({ userToken });
    if (successes) {
      commit(MODULE.MUTATE_CHART_DATA, data);
    }
    // dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  [MODULE.SET_REPORT_TYPES]({ commit, state }, reportType) {
    const reportTypes = cloneDeep(state.reportTypes);
    const typeIndex = reportTypes.indexOf(reportType);
    if (typeIndex >= 0) {
      reportTypes.splice(typeIndex, 1);
    } else {
      reportTypes.push(reportType);
    }
    commit(MODULE.MUTATE_REPORT_TYPES, reportTypes);
  },
};
