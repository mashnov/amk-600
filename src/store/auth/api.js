import MODULE from './types';
import { sleep } from '~/helpers/system';

export default {
  async [MODULE.RE_LOGIN_HANDLER]({ userToken }) {
    await sleep(2000);
    return {
      successes: true,
      token: 'anyTokenText',
      group: 'user'
    };
  },
  async [MODULE.LOGIN_HANDLER]({ username, password }) {
    await sleep(2000);
    return {
      successes: true,
      token: 'anyTokenText',
      group: 'user'
    };
  },
  async [MODULE.LOGOUT_HANDLER]({ token }) {
    await sleep(2000);
    return {
      success: true
    };
  },
};
