import cloneDeep from 'lodash/cloneDeep';
import MODULE from './types';
import { VIEWPORT } from '~/store/types';

const lockerId = 'modal';
const lockPageActionName = `viewport/${VIEWPORT.LOCK}`;
const unLockPageActionName = `viewport/${VIEWPORT.UNLOCK}`;

export default {
  [MODULE.SHOW_MODAL]({ commit, dispatch }, { component, position, closable = true }) {
    commit(MODULE.MUTATE_POSITION, position || null);
    commit(MODULE.MUTATE_COMPONENT, cloneDeep(component));
    commit(MODULE.MUTATE_CLOSABLE, closable);
    dispatch(lockPageActionName, lockerId, { root: true });
  },
  [MODULE.HIDE_MODAL]({ commit, dispatch }) {
    commit(MODULE.MUTATE_COMPONENT, null);
    commit(MODULE.MUTATE_POSITION, null);
    commit(MODULE.MUTATE_CLOSABLE, true);
    dispatch(unLockPageActionName, lockerId, { root: true });
  },
};
