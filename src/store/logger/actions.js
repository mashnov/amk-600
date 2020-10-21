import MODULE from './types';
import {
  getIsMobile,
  getUserAgent,
  getBrowserName,
  getAdBlockDetectedValue,
} from '~/helpers/logger';

export default {
  [MODULE.INIT]({ commit }) {
    const { os, name } = getBrowserName();
    const isMobile = getIsMobile();
    const isBlocked = getAdBlockDetectedValue();
    const userAgent = getUserAgent();
    commit(MODULE.MUTATE_USER_AGENT, userAgent);
    commit(MODULE.MUTATE_USER_BROWSER, name);
    commit(MODULE.MUTATE_USER_OS, os);
    commit(MODULE.MUTATE_IS_MOBILE, isMobile);
    commit(MODULE.MUTATE_IS_AD_BLOCK, isBlocked);
  },
};
