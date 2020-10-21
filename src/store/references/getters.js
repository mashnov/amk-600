import MODULE from './types';

export default {
  [MODULE.GET_LANGUAGE_ID]: ({ languageId }) => languageId,
  [MODULE.GET_I18N]: ({ i18n, languageId }) => i18n[languageId],
};
