import { getUserToken, setUserToken, removeUserToken } from '~/helpers/logger';
import { ADMIN, LOGGER, REPORTS, USER } from '~/store/types';

import MODULE from './types';
import Api from './api';

const RESET_ADMIN_STATE = `admin/${ADMIN.RESET_STATE}`;
const RESET_REPORTS_STATE = `reports/${REPORTS.RESET_STATE}`;
const RESET_USER_STATE = `user/${USER.RESET_STATE}`;
const RESET_LOGGER_STATE = `logger/${LOGGER.RESET_STATE}`;
const REQUEST_LOGGER_START = `logger/${LOGGER.REQUEST_START}`;
const REQUEST_LOGGER_STOP = `logger/${LOGGER.REQUEST_STOP}`;

export default {
  async [MODULE.INIT]({ dispatch }) {
    const userToken = getUserToken();
    dispatch(REQUEST_LOGGER_START, MODULE.INIT, { root: true });
    const { successes, token, group } = await Api.RE_LOGIN_HANDLER({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.INIT, { root: true });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
    }
    return { successes, group };
  },
  async [MODULE.LOGIN_HANDLER]({ dispatch }, { username, password }) {
    dispatch(REQUEST_LOGGER_START, MODULE.LOGIN_HANDLER, { root: true });
    const { successes, token, group } = await Api.LOGIN_HANDLER({ username, password });
    dispatch(REQUEST_LOGGER_STOP, MODULE.LOGIN_HANDLER, { root: true });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
    }
    return { successes, group };
  },
  async [MODULE.LOGOUT_HANDLER]({ dispatch, state: { userToken } }) {
    dispatch(REQUEST_LOGGER_START, MODULE.LOGOUT_HANDLER, { root: true });
    const { successes } = await Api.LOGOUT_HANDLER({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.LOGOUT_HANDLER, { root: true });
    if (successes) {
      dispatch(MODULE.RESET_STATE);
      dispatch(RESET_ADMIN_STATE, null, { root: true });
      dispatch(RESET_REPORTS_STATE, null, { root: true });
      dispatch(RESET_USER_STATE, null, { root: true });
      dispatch(RESET_LOGGER_STATE, null, { root: true });
    }
    return { successes };
  },
  [MODULE.SET_USER_TOKEN]({ commit }, userToken) {
    commit(MODULE.MUTATE_USER_TOKEN, userToken);
    setUserToken(userToken);
  },
  [MODULE.SET_USER_TYPE]({ commit }, userType) {
    commit(MODULE.MUTATE_USER_TYPE, userType);
  },
  [MODULE.RESET_STATE]({ dispatch }) {
    dispatch(MODULE.SET_USER_TOKEN, null);
    dispatch(MODULE.SET_USER_TYPE, null);
    removeUserToken();
  },
};
