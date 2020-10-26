import cloneDeep from 'lodash/cloneDeep';
import { AUTH } from '~/store/types';

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
      commit(MODULE.MUTATE_USER_DATA, users);
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
  async [MODULE.ADD_USER]({ rootGetters, dispatch }, { isAdmin, username, password }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, action, token } = await Api.ADD_USER({ userToken, isAdmin, username, password });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.EDIT_USER]({ rootGetters, dispatch }, { isAdmin, selectUser, username, password }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, action, token } = await Api.EDIT_USER({ userToken, isAdmin, selectUser, username, password });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.REMOVE_USER]({ rootGetters, dispatch }, { username }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, action, token } = await Api.REMOVE_USER({ userToken, username });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.CLEAR_LOGS]({ rootGetters, dispatch }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token } = await Api.CLEAR_LOGS({ userToken });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.RESTART_CPU]({ rootGetters, dispatch }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token } = await Api.RESTART_CPU({ userToken });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  [MODULE.SET_SELECTED_USER]({ commit }, userName) {
    commit(MODULE.MUTATE_SELECTED_USER, userName);
  },
  [MODULE.RESET_STATE]({ commit }) {
    const { deviceData, userData } = getDefaultState();
    commit(MODULE.MUTATE_DEVICE_DATA, deviceData);
    commit(MODULE.MUTATE_USER_DATA, userData);
  },
};
