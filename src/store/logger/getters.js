import MODULE from './types';

const BLUR_SUPPORT_OS = [
  'iOS',
];
const BLUR_SUPPORT_BROWSER = [
  'chrome',
  'edge',
  'safari',
  'opera',
];

export default {
  [MODULE.GET_USER_AGENT]: ({ userAgent }) => userAgent,
  [MODULE.GET_USER_BROWSER]: ({ userBrowser }) => userBrowser,
  [MODULE.GET_USER_OS]: ({ userOs }) => userOs,
  [MODULE.GET_IS_MOBILE]: ({ isMobile }) => isMobile,
  [MODULE.GET_IS_AD_BLOCK]: ({ isAdBlock }) => isAdBlock,
  [MODULE.GET_REQUEST_LIST]: ({ requests }) => requests,
  [MODULE.GET_BLUR_IS_SUPPORT]: ({ userOs, userBrowser }) => BLUR_SUPPORT_OS.includes(userOs) || BLUR_SUPPORT_BROWSER.includes(userBrowser),
};
