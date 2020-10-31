import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { auth } from '~/store/request-url';

const tokenIsEmpty = (userToken = '') => (![null, 'null', 'undefined', ''].includes(userToken));

export default {
  async [MODULE.RE_LOGIN_HANDLER]({ userToken }) {
    const apiUrl = auth.reLogin;
    if (tokenIsEmpty) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      const group = get(data, 'group', null);
      return { successes, token, group };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.LOGIN_HANDLER]({ username, password }) {
    const apiUrl = auth.login;
    if (tokenIsEmpty) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { username, password });
      const successes = get(data, 'successes', false);
      const token = get(data, 'token', null);
      const group = get(data, 'group', null);
      return { successes, token, group };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.LOGOUT_HANDLER]({ userToken }) {
    const apiUrl = auth.logout;
    if (tokenIsEmpty) {
      return { successes: false };
    }
    try {
      const { data } = await axios.post(apiUrl, { token: userToken });
      const successes = get(data, 'successes', false);
      return { successes };
    }
    catch {
      return { successes: false };
    }
  },
};
