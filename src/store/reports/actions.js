import MODULE from './types';
import Api from './api';

const USER_TOKEN_GETTER_KEY = 'auth/GET_USER_TOKEN';

export default {
  async [MODULE.FETCH_REPORT_FILE]({ rootGetters }, { range }) {
    const token = rootGetters[USER_TOKEN_GETTER_KEY];
    return await Api.FETCH_REPORT_FILE({ range, token });
  },
};
