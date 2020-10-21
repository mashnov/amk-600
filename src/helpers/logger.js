import isMobile from 'ismobilejs';
import { detect } from 'detect-browser';

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
