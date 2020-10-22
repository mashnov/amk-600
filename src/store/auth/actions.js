import Api from './api';
import { getUserToken, setUserToken, removeUserToken } from '~/helpers/logger';
import MODULE from './types';

export default {
  async [MODULE.INIT]({ dispatch }) {
    const userToken = getUserToken();
    const { successes, token, group } = await Api.RE_LOGIN_HANDLER({ userToken });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
      setUserToken(token);
      return { successes, group };
    }
    if (!successes) {
      return { successes };
    }
  },
  async [MODULE.LOGIN_HANDLER]({ dispatch }, { login, password }) {
    const { successes, token, group } = await Api.LOGIN_HANDLER({ login, password });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, token);
      dispatch(MODULE.SET_USER_TYPE, group);
      setUserToken(token);
      return { successes, group };
    }
    if (!successes) {
      return { successes };
    }
  },
  async [MODULE.LOGOUT_HANDLER]({ dispatch, state: { userToken } }) {
    const { successes } = await Api.LOGOUT_HANDLER({ userToken });
    if (successes) {
      dispatch(MODULE.SET_USER_TOKEN, null);
      dispatch(MODULE.SET_USER_TYPE, null);
      removeUserToken();
    }
    return { successes };
  },
  [MODULE.SET_USER_TOKEN]({ commit }, userToken) {
    commit(MODULE.MUTATE_USER_TOKEN, userToken);
  },
  [MODULE.SET_USER_TYPE]({ commit }, userType) {
    commit(MODULE.MUTATE_USER_TYPE, userType);
  },
};
