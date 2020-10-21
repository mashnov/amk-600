import MODULE from './types';

export default {
  [MODULE.GET_POSITION]: ({ position }) => position,
  [MODULE.GET_COMPONENT]: ({ component }) => component,
  [MODULE.GET_CLOSABLE]: ({ closable }) => closable,
};
