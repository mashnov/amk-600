<template>
  <div class="row justify-content-center user-page">
    <div class="col-12 col-xl-8">
      <div class="row mb-5">
        <div class="col-12">
          <UserMomentData />
        </div>
      </div>
      <transition
        appear
        name="fade-in"
      >
        <div
          v-if="reportTypes.length"
          class="row mb-5"
        >
          <div class="col-12">
            <UserChart />
          </div>
        </div>
      </transition>
      <div class="row">
        <div class="col-12">
          <UserStatData />
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-4">
      <UserStatus />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REPORTS } from '~/store/types';

  import UserMomentData from './UserMomentData';
  import UserChart from './UserChart';
  import UserStatData from './UserStatData';
  import UserStatus from './UserStatus';

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChart,
      UserStatData,
      UserStatus,
    },
    computed: {
      ...mapGetters('reports', {
        reportTypes: REPORTS.GET_REPORT_TYPES,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .user-page {
    padding: 20px 10px;
  }
  @media (min-width: $screen-lg) {
    .user-page {
      padding: 50px;
    }
  }
</style>
