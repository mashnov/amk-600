export default {
  methods: {
    $_registerStoreModule(module) {
      const { $store } = this;
      const { moduleName } = module;
      const moduleIsRegistered = $store.hasModule(moduleName);
      if (!moduleIsRegistered) {
        $store.registerModule(moduleName, module);
      }
    },
    $_unRegisterStoreModule(module) {
      const { $store } = this;
      const { moduleName } = module;
      $store.unregisterModule(moduleName);
    },
  },
};
