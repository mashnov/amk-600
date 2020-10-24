<template>
  <div class="user-view">
    <div class="container-fluid">
      <UserPage />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { USER, REPORTS, PRELOADER } from '~/store/types';

  import storeMixin from '~/mixins/storeMixin';
  import userModule from '~/store/user';
  import UserPage from '~/components/user/UserPage';

  const PRELOADER_KEY = 'userFetchData';

  export default {
    name: 'UserView',
    components: {
      UserPage,
    },
    mixins: [
      storeMixin,
    ],
    created() {
      this.$_registerStoreModule(userModule);
    },
    mounted() {
     this.fetchUserData();
    },
    destroyed() {
      this.$_unRegisterStoreModule(userModule);
    },
    methods: {
      ...mapActions('user', {
        fetchStatData: USER.FETCH_DATA,
      }),
      ...mapActions('reports', {
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      async fetchUserData() {
        this.showPreloader(PRELOADER_KEY);
        await this.fetchStatData();
        await this.fetchChartData();
        this.hidePreloader(PRELOADER_KEY);
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
