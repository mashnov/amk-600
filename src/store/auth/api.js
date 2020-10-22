import axios from 'axios';
import MODULE from './types';
import { auth } from '~/store/request-url';

export default {
  async [MODULE.RE_LOGIN_HANDLER]({ userToken }) {
    const apiUrl = auth.reLogin;
    try {
      const { successes, token, group } = await axios.post(apiUrl, { token: userToken });
      return { successes, token, group };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.LOGIN_HANDLER]({ login, password }) {
    const apiUrl = auth.login;
    try {
      const { successes, token, group } = await axios.post(apiUrl, { login, password });
      return { successes, token, group };
    }
    catch {
      return { successes: false };
    }
  },
  async [MODULE.LOGOUT_HANDLER]({ userToken }) {
    const apiUrl = auth.logout;
    try {
      const { successes } = await axios.post(apiUrl, { token: userToken });
      return { successes };
    }
    catch {
      return { successes: false };
    }
  },
};
