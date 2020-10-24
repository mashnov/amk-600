import MODULE from './types';
import { sleep } from '~/helpers/system';
import chartData from './chart-data';

export default {
  async [MODULE.FETCH_REPORT_FILE]({ token, range }) {
    const params = {
      token,
      range,
      type: 'csv',
      query: ['temperature', 'pressure', 'humidity', 'rain'],
    };
    await sleep(2000);
    console.log(params);
    return '';
  },
  async [MODULE.FETCH_CHART_DATA]({ token }) {
    await sleep(2000);
    return chartData;
  },
};
