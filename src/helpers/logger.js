import isMobile from 'ismobilejs';
import { detect } from 'detect-browser';
import $cookies from 'vue-cookies';

const AVAILABLE_LANGUAGES = process.env.VUE_APP_AVAILABLE_LANGUAGES.split(' ');
const DEFAULT_LANGUAGE_ID = AVAILABLE_LANGUAGES[0];
const LANGUAGES_COOKIE_KEY = process.env.VUE_APP_LANGUAGES_COOKIE_KEY;
const USER_TOKEN_COOKIE_KEY = process.env.VUE_APP_USER_TOKEN_COOKIE_KEY;
const USER_REPORT_TYPES_COOKIE_KEY = process.env.VUE_APP_USER_REPORT_TYPES_COOKIE_KEY;
const USER_REPORT_RANGE_COOKIE_KEY = process.env.VUE_APP_CHART_RANGE_COOKIE_KEY;

export const getBrowserName = () => {
  const { name, os } = detect();
  return { name, os };
};
export const getUserAgent = () => {
  return navigator.userAgent;
};
export const getIsMobile = () => {
  const { phone, tablet } = isMobile();
  return phone || tablet;
};
export const getAdBlockDetectedValue = () => {
  const blockedItem = document.getElementById('adBanner');
  return window.getComputedStyle(blockedItem).display === 'none';
};
export const getLanguageId = () => {
  const url = new URL(window.location.href);
  const urlLangId = url.searchParams.get('lang');
  const cookieLangId = $cookies.get(LANGUAGES_COOKIE_KEY);
  if (urlLangId && AVAILABLE_LANGUAGES.includes(urlLangId)) {
    return urlLangId;
  }
  if (cookieLangId && AVAILABLE_LANGUAGES.includes(cookieLangId)) {
    return cookieLangId;
  }
  return DEFAULT_LANGUAGE_ID;
};
export const setLanguageId = (languageId) => {
  $cookies.set(LANGUAGES_COOKIE_KEY, languageId);
};
export const getUserToken = () => {
  return $cookies.get(USER_TOKEN_COOKIE_KEY);
};
export const setUserToken = (token) => {
  $cookies.set(USER_TOKEN_COOKIE_KEY, token);
};
export const removeUserToken = () => {
  $cookies.remove(USER_TOKEN_COOKIE_KEY);
};
export const getUserReportTypes = () => {
  const reportTypes = $cookies.get(USER_REPORT_TYPES_COOKIE_KEY);
  return reportTypes && reportTypes.split(',');
};
export const setUserReportTypes = (types) => {
  $cookies.set(USER_REPORT_TYPES_COOKIE_KEY, types);
};
export const removeUserReportTypes = () => {
  $cookies.remove(USER_REPORT_TYPES_COOKIE_KEY);
};
export const getUserReportRange = () => {
  return $cookies.get(USER_REPORT_RANGE_COOKIE_KEY);
};
export const setUserReportRange = (range) => {
  $cookies.set(USER_REPORT_RANGE_COOKIE_KEY, range);
};
export const removeUserReportRange = () => {
  $cookies.remove(USER_REPORT_RANGE_COOKIE_KEY);
};
export const tokenIsEmpty = (userToken = '') => (![null, 'null', 'undefined', ''].includes(userToken));
