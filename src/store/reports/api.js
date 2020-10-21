import MODULE from './types';
import { sleep } from '~/helpers/system';

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
};
