import MODULE from './types';

export default {
  [MODULE.MUTATE_PRELOADER_LIST]: (state, list) => {
    state.list = list;
  },
};
