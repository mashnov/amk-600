import MODULE from './types';

export default {
  [MODULE.MUTATE_USER_LANGUAGE]: (state, userLanguage) => {
    state.userLanguage = userLanguage;
  },
  [MODULE.MUTATE_USER_AGENT]: (state, userAgent) => {
    state.userAgent = userAgent;
  },
  [MODULE.MUTATE_USER_BROWSER]: (state, userBrowser) => {
    state.userBrowser = userBrowser;
  },
  [MODULE.MUTATE_USER_OS]: (state, userOs) => {
    state.userOs = userOs;
  },
  [MODULE.MUTATE_USER_TOKEN]: (state, userToken) => {
    state.userToken = userToken;
  },
  [MODULE.MUTATE_IS_MOBILE]: (state, isMobile) => {
    state.isMobile = isMobile;
  },
  [MODULE.MUTATE_IS_AD_BLOCK]: (state, isAdBlock) => {
    state.isAdBlock = isAdBlock;
  },
};
