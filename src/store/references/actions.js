import MODULE from './types';
import { getLanguageId, setLanguageId } from '~/helpers/logger';

export default {
  async [MODULE.INIT]({ dispatch }) {
    dispatch(MODULE.SET_LANGUAGE_ID, getLanguageId());
    return true;
  },
  [MODULE.SET_LANGUAGE_ID]({ commit }, languageId) {
    commit(MODULE.MUTATE_LANGUAGE_ID, languageId);
    setLanguageId(languageId);
  },
};
