import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { user } from '~/store/request-url';

const tokenIsEmpty = (userToken = '') => (![null, 'null', 'undefined', ''].includes(userToken));

export default {
  async [MODULE.FETCH_USER_DATA]({ userToken }) {
    const apiUrl = user.fetchData;
    if (tokenIsEmpty) {
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
};
