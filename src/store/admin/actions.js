import cloneDeep from 'lodash/cloneDeep';
import { AUTH } from '~/store/types';
import { adminUserTransformer } from '~/helpers/transformers';

import MODULE from './types';
import defaultState from './defaultState';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

const getDefaultState = () => (cloneDeep(defaultState));

export default {
  async [MODULE.FETCH_DATA]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token, data } = await Api.FETCH_DATA({ userToken });
    if (successes) {
      commit(MODULE.MUTATE_DEVICE_DATA, data);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.FETCH_USER_LIST]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token, users } = await Api.FETCH_USER_LIST({ userToken });
    if (successes) {
      const { userData } = adminUserTransformer(users);
      commit(MODULE.MUTATE_USER_DATA, userData);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.CHANGE_MAIN_SENSOR]({ rootGetters, dispatch }, { name, type }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token } = await Api.CHANGE_MAIN_SENSOR({ userToken, type, name });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  [MODULE.RESET_STATE]({ commit }) {
    const { deviceData, userData } = getDefaultState();
    commit(MODULE.MUTATE_DEVICE_DATA, deviceData);
    commit(MODULE.MUTATE_USER_DATA, userData);
  },
};
