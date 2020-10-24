import Api from './api';
import { getUserToken, setUserToken, removeUserToken } from '~/helpers/logger';
import MODULE from './types';
import { ADMIN, REPORTS, USER } from '~/store/types';

const RESET_ADMIN_STATE = `admin/${ADMIN.RESET_STATE}`;
const RESET_REPORTS_STATE = `reports/${REPORTS.RESET_STATE}`;
const RESET_USER_STATE = `user/${USER.RESET_STATE}`;

export default {
  async [MODULE.INIT]({ dispatch }) {
    const userToken = getUserToken();
    const { successes, token, group } = await Api.RE_LOGIN_HANDLER({ userToken });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
    }
    return { successes, group };
  },
  async [MODULE.LOGIN_HANDLER]({ dispatch }, { username, password }) {
    const { successes, token, group } = await Api.LOGIN_HANDLER({ username, password });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
    }
    return { successes, group };
  },
  async [MODULE.LOGOUT_HANDLER]({ dispatch, state: { userToken } }) {
    const { successes } = await Api.LOGOUT_HANDLER({ userToken });
    if (successes) {
      dispatch(MODULE.RESET_STATE);
      dispatch(RESET_ADMIN_STATE, null, { root: true });
      dispatch(RESET_REPORTS_STATE, null, { root: true });
      dispatch(RESET_USER_STATE, null, { root: true });
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
