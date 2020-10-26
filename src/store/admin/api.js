import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { admin } from '~/store/request-url';

export default {
  async [MODULE.FETCH_DATA]({ userToken }) {
    const apiUrl = admin.fetchData;
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
  async [MODULE.FETCH_USER_LIST]({ userToken }) {
    const apiUrl = admin.fetchUsers;
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
