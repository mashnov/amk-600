import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { auth } from '~/store/request-url';

export default {
  async [MODULE.RE_LOGIN_HANDLER]({ userToken }) {
    const apiUrl = auth.reLogin;
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
