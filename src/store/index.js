import Vue from 'vue';
import Vuex from 'vuex';

import references from './references/index';
import viewport from './viewport/index';
import modal from './modal/index';
import preloader from './preloader/index';
import logger from './logger/index';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    references,
    viewport,
    modal,
    preloader,
    logger,
  },
});
