import MODULE from './types';

export default {
  [MODULE.MUTATE_I18N]: (state, i18n) => {
    state.i18n = i18n;
  },
  [MODULE.MUTATE_LANGUAGE_ID]: (state, languageId) => {
    state.languageId = languageId;
  },
};
