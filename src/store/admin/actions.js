import cloneDeep from 'lodash/cloneDeep';
import isNull from 'lodash/isNull';
import { AUTH, LOGGER } from '~/store/types';

import MODULE from './types';
import defaultState from './defaultState';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

const REQUEST_LOGGER_START = `logger/${LOGGER.REQUEST_START}`;
const REQUEST_LOGGER_STOP = `logger/${LOGGER.REQUEST_STOP}`;

const getDefaultState = () => (cloneDeep(defaultState));

export default {
  async [MODULE.FETCH_DATA]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.FETCH_DATA, { root: true });
    const { successes, token, data } = await Api.FETCH_DATA({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.FETCH_DATA, { root: true });
    if (successes) {
      commit(MODULE.MUTATE_DEVICE_DATA, data);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.FETCH_USER_LIST]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.FETCH_USER_LIST, { root: true });
    const { successes, token, users } = await Api.FETCH_USER_LIST({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.FETCH_USER_LIST, { root: true });
    if (successes) {
      commit(MODULE.MUTATE_USER_DATA, users);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.CHANGE_MAIN_SENSOR]({ rootGetters, dispatch }, { name, type }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.CHANGE_MAIN_SENSOR, { root: true });
    const { successes, token } = await Api.CHANGE_MAIN_SENSOR({ userToken, type, name });
    dispatch(REQUEST_LOGGER_STOP, MODULE.CHANGE_MAIN_SENSOR, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.ADD_USER]({ rootGetters, dispatch }, { isAdmin, username, password }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.ADD_USER, { root: true });
    const { successes, action, token } = await Api.ADD_USER({ userToken, isAdmin, username, password });
    dispatch(REQUEST_LOGGER_STOP, MODULE.ADD_USER, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.EDIT_USER]({ rootGetters, dispatch }, { isAdmin, selectUser, username, password }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.EDIT_USER, { root: true });
    const { successes, action, token } = await Api.EDIT_USER({ userToken, isAdmin, selectUser, username, password });
    dispatch(REQUEST_LOGGER_STOP, MODULE.EDIT_USER, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.REMOVE_USER]({ rootGetters, dispatch }, { username }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.REMOVE_USER, { root: true });
    const { successes, action, token } = await Api.REMOVE_USER({ userToken, username });
    dispatch(REQUEST_LOGGER_STOP, MODULE.REMOVE_USER, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes, action };
  },
  async [MODULE.CLEAR_LOGS]({ rootGetters, dispatch }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.CLEAR_LOGS, { root: true });
    const { successes, token } = await Api.CLEAR_LOGS({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.CLEAR_LOGS, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.RESTART_CPU]({ rootGetters, dispatch }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.RESTART_CPU, { root: true });
    const { successes, token } = await Api.RESTART_CPU({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.RESTART_CPU, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.SET_DEVICE_NAME]({ rootGetters, dispatch }, deviceName) {
    if (isNull(deviceName)) {
      return { successes: true };
    }
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_DEVICE_NAME, { root: true });
    const { successes, token } = await Api.SET_DEVICE_NAME({ userToken, deviceName });
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_DEVICE_NAME, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.SET_TIMEZONE]({ rootGetters, dispatch }, deviceTimezone) {
    if (isNull(deviceTimezone)) {
      return { successes: true };
    }
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_TIMEZONE, { root: true });
    const { successes, token } = await Api.SET_TIMEZONE({ userToken, deviceTimezone });
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_TIMEZONE, { root: true });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  async [MODULE.SET_CAMERA_PARAMS]({ rootGetters, dispatch }, { cameraPort, cameraStream }) {
    const success = {
      port: true,
      stream: true,
    };
    let userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_CAMERA_PARAMS, { root: true });
    if (!isNull(cameraPort)) {
      const { successes, token } = await Api[MODULE.SET_CAMERA_PORT]({ userToken, cameraPort });
      success.port = successes;
      userToken = token;
      dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    }
    if (!isNull(cameraStream)) {
      const { successes, token } = await Api[MODULE.SET_CAMERA_STREAM]({ userToken, cameraStream });
      success.stream = successes;
      userToken = token;
      dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    }
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_CAMERA_PARAMS, { root: true });
    return { successes: success.port && success.stream };
  },
  async [MODULE.SET_COMPASS_PARAMS]({ rootGetters, dispatch }, { compassCorrection }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_COMPASS_PARAMS, { root: true });
    const { successes, token } = await Api[MODULE.SET_COMPASS_CORRECTION]({ userToken, compassCorrection });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_COMPASS_PARAMS, { root: true });
    return { successes };
  },
  async [MODULE.SET_WIND_PARAMS]({ rootGetters, dispatch }, { windCorrection }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_WIND_PARAMS, { root: true });
    const { successes, token } = await Api[MODULE.SET_WIND_PARAMS]({ userToken, windCorrection });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_WIND_PARAMS, { root: true });
    return { successes };
  },
  async [MODULE.SET_WIND_CORRECTION]({ rootGetters, dispatch }, { windCorrection }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.SET_WIND_CORRECTION, { root: true });
    const { successes, token } = await Api[MODULE.SET_WIND_CORRECTION]({ userToken, windCorrection });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    dispatch(REQUEST_LOGGER_STOP, MODULE.SET_WIND_CORRECTION, { root: true });
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
