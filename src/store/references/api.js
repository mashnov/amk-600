import MODULE from './types';
import { sleep } from '~/helpers/system';
import i18n from './i18n';

export default {
  async [MODULE.FETCH_I18N]() {
    await sleep(0);
    return i18n;
  },
};
