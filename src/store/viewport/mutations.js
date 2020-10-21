import MODULE from './types';

export default {
  [MODULE.MUTATE_CURRENT_BREAKPOINT]: (state, currentBreakpoint) => {
    state.currentBreakpoint = currentBreakpoint;
  },
  [MODULE.MUTATE_SCROLL_TOP]: (state, scrollTop) => {
    state.scrollTop = scrollTop;
  },
  [MODULE.MUTATE_SCROLL_DIR]: (state, scrollDir) => {
    state.scrollDir = scrollDir;
  },
  [MODULE.MUTATE_WINDOW_IS_FOCUSED]: (state, windowIsFocused) => {
    state.windowIsFocused = windowIsFocused;
  },
  [MODULE.MUTATE_VIEWPORT_HEIGHT]: (state, viewportHeight) => {
    state.viewportHeight = viewportHeight;
  },
  [MODULE.MUTATE_VIEWPORT_WIDTH]: (state, viewportWidth) => {
    state.viewportWidth = viewportWidth;
  },
  [MODULE.MUTATE_LOCKER]: (state, lockers) => {
    state.lockers = lockers;
  },
};
