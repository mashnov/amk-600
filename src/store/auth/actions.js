import Api from './api';
import { getUserToken, setUserToken, removeUserToken } from '~/helpers/logger';
import MODULE from './types';

export default {
  async [MODULE.INIT]({ dispatch }) {
    const userToken = getUserToken();
    const { successes, token, group } = await Api.RE_LOGIN_HANDLER({ userToken });
    dispatch(MODULE.SET_USER_TOKEN, token);
    dispatch(MODULE.SET_USER_TYPE, group);
    setUserToken(token);
    return { successes, group };
  },
  async [MODULE.LOGIN_HANDLER]({ dispatch, state: { username, password } }) {
    const { successes, token, group } = await Api.LOGIN_HANDLER({ username, password });
    dispatch(MODULE.SET_USERNAME, '');
    dispatch(MODULE.SET_PASSWORD, '');
    dispatch(MODULE.SET_USER_TOKEN, token);
    dispatch(MODULE.SET_USER_TYPE, group);
    setUserToken(token);
    return { successes, group };
  },
  async [MODULE.LOGOUT_HANDLER]({ dispatch, state: { userToken } }) {
    const response = await Api.LOGOUT_HANDLER({ userToken });
    dispatch(MODULE.SET_USER_TOKEN, null);
    dispatch(MODULE.SET_USER_TYPE, null);
    removeUserToken();
    return response;
  },
  [MODULE.SET_USER_TOKEN]({ commit }, userToken) {
    commit(MODULE.MUTATE_USER_TOKEN, userToken);
  },
  [MODULE.SET_USER_TYPE]({ commit }, userType) {
    commit(MODULE.MUTATE_USER_TYPE, userType);
  },
  [MODULE.SET_USERNAME]({ commit }, username) {
    commit(MODULE.MUTATE_USERNAME, username);
  },
  [MODULE.SET_PASSWORD]({ commit }, password) {
    commit(MODULE.MUTATE_PASSWORD, password);
  },
};
