import axios from 'axios';
import get from 'lodash/get';
import MODULE from './types';
import { reports } from '~/store/request-url';

export default {
  async [MODULE.FETCH_CHART_DATA]({ userToken, reportTypes, reportRange }) {
    const apiUrl = reports.chartData;
    const params = {
      token: userToken,
      range: reportRange,
      query: reportTypes,
      type: 'json',
    };
    try {
      const repsonse = await axios.post(apiUrl, params);
      const successes = get(repsonse, 'data.successes', false);
      const token = get(repsonse, 'data.token', null);
      const data = get(repsonse, 'data.data', null);
      return { successes, token, data };
    }
    catch {
      return { successes: false };
    }
  },
};
