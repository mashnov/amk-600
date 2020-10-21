import cloneDeep from 'lodash/cloneDeep';
import throttle from 'lodash/throttle';
import MODULE from './types';

import {
  getCurrentBreakpoint,
  getScrollTop,
  getScrollDir,
  getWindowIsFocused,
  getViewportHeight,
  getViewportWidth,
} from '~/helpers/viewport';

export default {
  [MODULE.INIT]({ dispatch }) {
    dispatch(MODULE.SET_CURRENT_BREAKPOINT);
    dispatch(MODULE.SET_VIEWPORT_HEIGHT);
    dispatch(MODULE.SET_VIEWPORT_WIDTH);
    dispatch(MODULE.SET_SCROLL_TOP);
    window.addEventListener('focus', throttle(() => {
      dispatch(MODULE.SET_WINDOW_IS_FOCUSED);
    }, 100), { passive: true });
    window.addEventListener('blur', throttle(() => {
      dispatch(MODULE.SET_WINDOW_IS_FOCUSED);
    }, 100), { passive: true });
    window.addEventListener('resize', throttle(() => {
      dispatch(MODULE.SET_VIEWPORT_HEIGHT);
      dispatch(MODULE.SET_VIEWPORT_WIDTH);
      dispatch(MODULE.SET_CURRENT_BREAKPOINT);
    }, 100), { passive: true });
    window.addEventListener('scroll', throttle(() => {
      dispatch(MODULE.SET_SCROLL_TOP);
    }, 100), { passive: true });
  },
  [MODULE.SET_CURRENT_BREAKPOINT]({ commit }) {
    const currentBreakpoint = getCurrentBreakpoint();
    commit(MODULE.MUTATE_CURRENT_BREAKPOINT, currentBreakpoint);
  },
  [MODULE.SET_SCROLL_TOP]({ commit, state: { scrollTop } }) {
    const scrollValue = getScrollTop();
    const scrollDir = getScrollDir({ scrollValue, scrollTop });
    commit(MODULE.MUTATE_SCROLL_TOP, scrollValue);
    commit(MODULE.MUTATE_SCROLL_DIR, scrollDir);
  },
  [MODULE.SET_WINDOW_IS_FOCUSED]({ commit }) {
    const isFocused = getWindowIsFocused();
    commit(MODULE.MUTATE_WINDOW_IS_FOCUSED, isFocused);
  },
  [MODULE.SET_VIEWPORT_HEIGHT]({ commit }) {
    const viewportHeight = getViewportHeight();
    commit(MODULE.MUTATE_VIEWPORT_HEIGHT, viewportHeight);
  },
  [MODULE.SET_VIEWPORT_WIDTH]({ commit }) {
    const viewportWidth = getViewportWidth();
    commit(MODULE.MUTATE_VIEWPORT_WIDTH, viewportWidth);
  },
  [MODULE.LOCK]({ commit, state }, id) {
    const lockers = cloneDeep(state.lockers);
    lockers.push(id);
    commit(MODULE.MUTATE_LOCKER, lockers);
  },
  [MODULE.UNLOCK]({ commit, state }, id) {
    const lockers = cloneDeep(state.lockers);
    const index = lockers.indexOf(id);
    lockers.splice(index, 1);
    commit(MODULE.MUTATE_LOCKER, lockers);
  },
};
