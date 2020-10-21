import MODULE from './types';

export default {
  [MODULE.GET_CURRENT_BREAKPOINT]: ({ currentBreakpoint }) => currentBreakpoint,
  [MODULE.GET_SCROLL_TOP]: ({ scrollTop }) => scrollTop,
  [MODULE.GET_SCROLL_DIR]: ({ scrollDir }) => scrollDir,
  [MODULE.GET_WINDOW_IS_FOCUSED]: ({ windowIsFocused }) => windowIsFocused,
  [MODULE.GET_VIEWPORT_HEIGHT]: ({ viewportHeight }) => viewportHeight,
  [MODULE.GET_VIEWPORT_WIDTH]: ({ viewportWidth }) => viewportWidth,
  [MODULE.GET_IS_LOCKED]: ({ lockers }) => !!lockers.length,
};
