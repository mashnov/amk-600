import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { admin } from '~/store/request-url';
import { tokenIsEmpty } from '~/helpers/logger';

export default {
  async [MODULE.FETCH_DATA]({ userToken }) {
    const apiUrl = admin.fetchData;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const response = await axios.post(apiUrl, { token: userToken });
      const successes = get(response, 'data.successes', false);
      const token = get(response, 'data.token', null);
      const data = get(response, 'data.data', null);
      return { successes, token, data };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.CHANGE_MAIN_SENSOR]({ userToken, type, name }) {
    const apiUrl = admin.setMainSensor;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, sensor: type, main: name });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.CLEAR_LOGS]({ userToken }) {
    const apiUrl = admin.clearLogs;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.RESTART_CPU]({ userToken }) {
    const apiUrl = admin.restartCpu;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.SET_DEVICE_NAME]({ userToken, deviceName }) {
    const apiUrl = admin.setSetting;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, val: deviceName, key: 'deviceName' });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.SET_CAMERA_PORT]({ userToken, cameraPort }) {
    const apiUrl = admin.setSetting;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, val: cameraPort, key: 'cameraPort' });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.SET_CAMERA_STREAM]({ userToken, cameraStream }) {
    const apiUrl = admin.setSetting;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, val: cameraStream, key: 'cameraVideoStream.url' });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.SET_COMPASS_CORRECTION]({ userToken, compassCorrection }) {
    const apiUrl = admin.setSetting;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, val: compassCorrection, key: 'calibration.compass' });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.SET_WIND_PARAMS]({ userToken, windCorrection }) {
    const apiUrl = admin.setSetting;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, val: windCorrection, key: 'calibration.wind.compassbias' });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.FETCH_USER_LIST]({ userToken }) {
    const apiUrl = admin.fetchUsers;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      const users = get(data, 'data.users', null);
      return { successes, token, users };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.ADD_USER]({ userToken, isAdmin, username, password }) {
    const apiUrl = admin.addUser;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, isAdmin, username, password });
      const successes = get(data, 'successes', false);
      const action = get(data, 'data.action', false);
      const token = get(data, 'token', null);
      return { successes, action, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.EDIT_USER]({ userToken, isAdmin, selectUser, username, password }) {
    const apiUrl = admin.editUser;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, user: selectUser, isAdmin, username, password });
      const action = get(data, 'data.action', false);
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, action, token };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.REMOVE_USER]({ userToken, username }) {
    const apiUrl = admin.deleteUser;
    if (tokenIsEmpty(userToken)) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken, username });
      const action = get(data, 'data.action', false);
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      return { successes, action, token };
    }
    catch {
      return { successes: false };
    }
  },
};
