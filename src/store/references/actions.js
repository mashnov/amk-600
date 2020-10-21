import MODULE from './types';
import Api from './api';
import { getLanguageId, setLanguageId } from '~/helpers/logger';

export default {
  async [MODULE.INIT]({ dispatch }) {
    dispatch(MODULE.SET_LANGUAGE_ID, getLanguageId());
    await dispatch(MODULE.FETCH_I18N);
    return true;
  },
  async [MODULE.FETCH_I18N]({ commit }) {
    const i18n = await Api.FETCH_I18N();
    commit(MODULE.MUTATE_I18N, i18n);
    return true;
  },
  [MODULE.SET_LANGUAGE_ID]({ commit }, languageId) {
    commit(MODULE.MUTATE_LANGUAGE_ID, languageId);
    setLanguageId(languageId);
  },
};
