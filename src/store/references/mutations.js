import MODULE from './types';

export default {
  [MODULE.MUTATE_IS_READY]: (state, isReady) => {
    state.isReady = isReady;
  },
  [MODULE.MUTATE_COUNTRIES]: (state, countries) => {
    state.countries = countries;
  },
  [MODULE.MUTATE_CURRENCIES]: (state, currencies) => {
    state.currencies = currencies;
  },
  [MODULE.MUTATE_OCCUPATION]: (state, occupation) => {
    state.occupation = occupation;
  },
  [MODULE.MUTATE_QUESTIONS]: (state, questions) => {
    state.questions = questions;
  },
  [MODULE.MUTATE_TRANSACTION]: (state, transactions) => {
    state.transactions = transactions;
  },
  [MODULE.MUTATE_IDENTITY]: (state, identity) => {
    state.identity = identity;
  },
  [MODULE.MUTATE_ADDRESS]: (state, address) => {
    state.address = address;
  },
  [MODULE.MUTATE_WIRE]: (state, wire) => {
    state.wire = wire;
  },
  [MODULE.MUTATE_ETF]: (state, eft) => {
    state.eft = eft;
  },
  [MODULE.MUTATE_PEP]: (state, pep) => {
    state.pep = pep;
  },
};
