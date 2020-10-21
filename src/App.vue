<template>
  <div
    id="app"
    class="app"
  >
    <Preloader />
    <Layout>
      <router-view />
    </Layout>
    <Modal />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { LOGGER, VIEWPORT, REFERENCES, AUTH, PRELOADER } from '~/store/types';
  import { USER as USER_ROUTE_NAMES, ADMIN as ADMIN_ROUTE_NAMES, AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import Preloader from '~/components/preloader/Preloader';
  import Layout from '~/components/layout/Layout';
  import Modal from '~/components/modal/Modal';

  const PRELOADER_KEY = 'reLogin';
  const REDIRECT_NAME_MAPPER = {
    user: USER_ROUTE_NAMES.user,
    admin: ADMIN_ROUTE_NAMES.admin,
  };

  export default {
    name: 'App',
    components: {
      Preloader,
      Modal,
      Layout,
    },
    computed: {
      currentRouteName() {
        const { $route } = this;
        return $route.name;
      },
    },
    created() {
      this.initApp();
      //TODO: REMOVE ROUTER LANG PARAMS
    },
    methods: {
      ...mapActions('references', {
        initReferences: REFERENCES.INIT,
      }),
      ...mapActions('viewport', {
        initViewport: VIEWPORT.INIT,
      }),
      ...mapActions('logger', {
        initLogger: LOGGER.INIT,
      }),
      ...mapActions('auth', {
        initAuth: AUTH.INIT,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      async initApp() {
        this.showPreloader(PRELOADER_KEY);
        await this.initReferences();
        await this.initViewport();
        await this.initLogger();
        const { successes, group } = await this.initAuth();
        const name = successes ? REDIRECT_NAME_MAPPER[group] : AUTH_ROUTE_NAMES.auth;
        this.hidePreloader(PRELOADER_KEY);
        this.redirectToPage(name);
      },
      redirectToPage(name) {
        const { currentRouteName } = this;
        if (currentRouteName !== name) {
          this.$router.push({ name });
        }
      },
    },
  };
</script>

<style lang="scss" src="~/assets/styles/base-style.scss"/>

<style lang="scss" scoped>
  .app {
    min-height: 100vh;
  }
</style>
