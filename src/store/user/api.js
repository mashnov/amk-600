import axios from 'axios';
import MODULE from './types';
import { user } from '~/store/request-url';

export default {
  async [MODULE.FETCH_DATA]({ userToken }) {
    const apiUrl = user.fetchData;
    try {
      const { successes, token, group } = await axios.post(apiUrl, { token: userToken });
      return { successes, token, group };
    }
    catch {
      return { successes: false };
    }
  },
};
