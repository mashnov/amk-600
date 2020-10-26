<template>
  <div class="admin-view">
    <div class="container-fluid">
      <AdminPage />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { ADMIN, PRELOADER, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import storeMixin from '~/mixins/storeMixin';
  import adminModule from '~/store/admin';
  import AdminPage from '~/components/admin/AdminPage';

  const FETCH_INTERVAL = process.env.VUE_APP_USER_DATA_FETCH_INTERVAL;
  const PRELOADER_KEY = 'adminFetchData';

  export default {
    name: 'AdminView',
    components: {
      AdminPage,
    },
    mixins: [
      storeMixin,
    ],
    data: () => ({
      requestTimer: null,
    }),
    created() {
      this.$_registerStoreModule(adminModule);
    },
    mounted() {
      this.fetchAdminData();
      this.startFetchInterval();
    },
    beforeDestroy() {
      this.stopFetchInterval();
    },
    destroyed() {
      this.$_unRegisterStoreModule(adminModule);
    },
    methods: {
      ...mapActions('admin', {
        fetchStatData: ADMIN.FETCH_DATA,
        fetchUserList: ADMIN.FETCH_USER_LIST,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async fetchAdminData() {
        this.showPreloader(PRELOADER_KEY);
        const statResponse = await this.fetchStatData();
        const userResponse = await this.fetchUserList();
        this.hidePreloader(PRELOADER_KEY);
        if (!statResponse.successes || !userResponse.successes) {
          this.logoutAction();
        }
      },
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
      },
      startFetchInterval() {
        const { requestTimer } = this;
        if (requestTimer) {
          this.stopFetchInterval();
        }
        this.requestTimer = setInterval(() => {
          console.log(FETCH_INTERVAL);
        }, FETCH_INTERVAL);
      },
      stopFetchInterval() {
        const { requestTimer } = this;
        clearInterval(requestTimer);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-view {
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
