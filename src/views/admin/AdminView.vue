<template>
  <div class="admin-view">
    <div class="container-fluid">
      <AdminPage />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ADMIN, PRELOADER, AUTH, LOGGER } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AdminPage from '~/components/admin/AdminPage';

  const FETCH_INTERVAL = process.env.VUE_APP_USER_DATA_FETCH_INTERVAL;
  const PRELOADER_KEY = 'adminFetchData';

  export default {
    name: 'AdminView',
    components: {
      AdminPage,
    },
    data: () => ({
      requestTimer: null,
    }),
    computed: {
      ...mapGetters('logger', {
        requestList: LOGGER.GET_REQUEST_LIST,
      }),
      requestIsPending() {
        const { requestList } = this;
        return !!requestList.length;
      },
    },
    mounted() {
      this.fetchAdminData();
      this.startFetchInterval();
    },
    beforeDestroy() {
      this.stopFetchInterval();
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
        const { requestTimer, requestIsPending } = this;
        if (requestTimer) {
          this.stopFetchInterval();
        }
        this.requestTimer = setInterval(() => {
          if (!requestIsPending) {
            this.fetchStatDataHandler();
          }
        }, FETCH_INTERVAL);
      },
      fetchStatDataHandler() {
        const { requestIsPending } = this;
        if (!requestIsPending) {
          this.fetchStatData();
        }
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
