import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  moduleName: 'viewport',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
