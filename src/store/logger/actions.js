import cloneDeep from 'lodash/cloneDeep';
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
  [MODULE.REQUEST_START]({ commit, state }, id) {
    const list = cloneDeep(state.requests);
    list.push(id);
    commit(MODULE.MUTATE_REQUEST_LIST, list);
  },
  [MODULE.REQUEST_STOP]({ commit, state }, id) {
    const list = cloneDeep(state.requests);
    const index = list.indexOf(id);
    list.splice(index, 1);
    commit(MODULE.MUTATE_REQUEST_LIST, list);
  },
  [MODULE.RESET_STATE]({ commit }) {
    commit(MODULE.MUTATE_REQUEST_LIST, []);
  },
};
