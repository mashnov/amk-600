import MODULE from './types';

export default {
  [MODULE.GET_USER_LANGUAGE]: ({ userLanguage }) => userLanguage,
  [MODULE.GET_USER_AGENT]: ({ userAgent }) => userAgent,
  [MODULE.GET_USER_BROWSER]: ({ userBrowser }) => userBrowser,
  [MODULE.GET_USER_OS]: ({ userOs }) => userOs,
  [MODULE.GET_USER_TOKEN]: ({ userToken }) => userToken,
  [MODULE.GET_IS_MOBILE]: ({ isMobile }) => isMobile,
  [MODULE.GET_IS_AD_BLOCK]: ({ isAdBlock }) => isAdBlock,
};
