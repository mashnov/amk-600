import cloneDeep from 'lodash/cloneDeep';

import { AUTH, LOGGER, REPORTS } from '~/store/types';

import { userDataTransformer } from '~/helpers/transformers';

import MODULE from './types';
import defaultState from './defaultState';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

const REQUEST_LOGGER_START = `logger/${LOGGER.REQUEST_START}`;
const REQUEST_LOGGER_STOP = `logger/${LOGGER.REQUEST_STOP}`;

const PASCAL_SYSTEM = 'hpa';
const METER_SYSTEM = 'mmhg';

const RELOAD_CHART_DATA_ACTION_NAME = `reports/${REPORTS.FETCH_CHART_DATA}`;

const getDefaultState = () => (cloneDeep(defaultState));

export default {
  async [MODULE.FETCH_USER_DATA]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(REQUEST_LOGGER_START, MODULE.FETCH_USER_DATA, { root: true });
    const { successes, token, data } = await Api.FETCH_USER_DATA({ userToken });
    dispatch(REQUEST_LOGGER_STOP, MODULE.FETCH_USER_DATA, { root: true });
    if (successes) {
      const { momentData, statData, deviceData, sensorData, unitSystem, cameraPort } = userDataTransformer(data);
      commit(MODULE.MUTATE_MOMENT_DATA, momentData);
      commit(MODULE.MUTATE_STAT_DATA, statData);
      commit(MODULE.MUTATE_DEVICE_DATA, deviceData);
      commit(MODULE.MUTATE_SENSOR_DATA, sensorData);
      commit(MODULE.MUTATE_UNIT_SYSTEM, unitSystem);
      commit(MODULE.MUTATE_CAMERA_PORT, cameraPort);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return { successes };
  },
  [MODULE.RESET_STATE]({ commit }) {
    const { momentData, statData, deviceData, sensorData } = getDefaultState();
    commit(MODULE.MUTATE_MOMENT_DATA, momentData);
    commit(MODULE.MUTATE_STAT_DATA, statData);
    commit(MODULE.MUTATE_DEVICE_DATA, deviceData);
    commit(MODULE.MUTATE_SENSOR_DATA, sensorData);
  },
  async [MODULE.CHANGE_UNIT_SYSTEM]({ dispatch, state: { unitSystem }, rootGetters }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const pressureUnit = unitSystem === METER_SYSTEM ? PASCAL_SYSTEM : METER_SYSTEM;
    dispatch(REQUEST_LOGGER_START, MODULE.CHANGE_UNIT_SYSTEM, { root: true });
    const { successes, token } = await Api.CHANGE_UNIT_SYSTEM({ userToken, pressureUnit });
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    const response = await dispatch(MODULE.FETCH_USER_DATA);
    dispatch(RELOAD_CHART_DATA_ACTION_NAME, null, { root: true });
    dispatch(REQUEST_LOGGER_STOP, MODULE.CHANGE_UNIT_SYSTEM, { root: true });
    return { successes: successes && response.successes };
  },
};
