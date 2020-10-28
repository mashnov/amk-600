<template>
  <div class="user-view">
    <div class="container-fluid">
      <UserPage />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { USER, REPORTS, PRELOADER, AUTH, LOGGER } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import UserPage from '~/components/user/UserPage';

  const FETCH_INTERVAL = process.env.VUE_APP_USER_DATA_FETCH_INTERVAL;
  const PRELOADER_KEY = 'userFetchData';

  export default {
    name: 'UserView',
    components: {
      UserPage,
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
      this.fetchUserData();
      this.startFetchInterval();
    },
    beforeDestroy() {
      this.stopFetchInterval();
    },
    methods: {
      ...mapActions('user', {
        fetchStatData: USER.FETCH_USER_DATA,
      }),
      ...mapActions('reports', {
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async fetchUserData() {
        this.showPreloader(PRELOADER_KEY);
        const statResponse = await this.fetchStatData();
        this.hidePreloader(PRELOADER_KEY);
        const chartResponse = await this.fetchChartData();
        if (!statResponse.successes || !chartResponse.successes) {
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
          this.fetchStatDataHandler();
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
  .user-view {
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
