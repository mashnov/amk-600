import MODULE from './types';
import Api from './api';

export default {
  async [MODULE.INIT]({ commit }) {
    const { countries, currencies, occupation, questions, transactions, identity, address, wire, eft, pep } = await Api[MODULE.FETCH_DICTIONARIES]();
    commit(MODULE.MUTATE_IS_READY, true);
    commit(MODULE.MUTATE_COUNTRIES, countries);
    commit(MODULE.MUTATE_CURRENCIES, currencies);
    commit(MODULE.MUTATE_OCCUPATION, occupation);
    commit(MODULE.MUTATE_QUESTIONS, questions);
    commit(MODULE.MUTATE_TRANSACTION, transactions);
    commit(MODULE.MUTATE_IDENTITY, identity);
    commit(MODULE.MUTATE_ADDRESS, address);
    commit(MODULE.MUTATE_WIRE, wire);
    commit(MODULE.MUTATE_ETF, eft);
    commit(MODULE.MUTATE_PEP, pep);
  },
};
