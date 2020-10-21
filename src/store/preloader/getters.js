import MODULE from './types';

export default {
  [MODULE.PRELOADER_IS_VISIBLE]: ({ list }) => !!list.length,
};
