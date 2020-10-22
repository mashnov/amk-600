import MODULE from './types';

export default {
  [MODULE.MUTATE_LANGUAGE_ID]: (state, languageId) => {
    state.languageId = languageId;
  },
};
