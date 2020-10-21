import MODULE from './types';

export default {
  [MODULE.GET_IS_READY]: ({ isReady }) => isReady,
  [MODULE.GET_I18N]: ({ i18n }) => i18n,
  [MODULE.GET_PHONES]: ({ phones }) => phones,
  [MODULE.GET_COUNTRIES]: ({ countries }) => countries,
  [MODULE.GET_CURRENCIES]: ({ currencies }) => currencies,
  [MODULE.GET_OCCUPATION]: ({ occupation }) => occupation,
  [MODULE.GET_QUESTIONS]: ({ questions }) => questions,
  [MODULE.GET_TRANSACTION]: ({ transactions }) => transactions,
  [MODULE.GET_IDENTITY]: ({ identity }) => identity,
  [MODULE.GET_ADDRESS]: ({ address }) => address,
  [MODULE.GET_WIRE]: ({ wire }) => wire,
  [MODULE.GET_ETF]: ({ eft }) => eft,
  [MODULE.GET_PEP]: ({ pep }) => pep,
};
