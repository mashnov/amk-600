import cloneDeep from 'lodash/cloneDeep';
import MODULE from './types';

export default {
  [MODULE.SHOW_PRELOADER]({ commit, state }, id) {
    const list = cloneDeep(state.list);
    list.push(id);
    commit(MODULE.MUTATE_PRELOADER_LIST, list);
  },
  [MODULE.HIDE_PRELOADER]({ commit, state }, id) {
    const list = cloneDeep(state.list);
    const index = list.indexOf(id);
    list.splice(index, 1);
    commit(MODULE.MUTATE_PRELOADER_LIST, list);
  },
};
