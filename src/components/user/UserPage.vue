<template>
  <div class="row justify-content-center user-page">
    <div class="col-12 col-xl-8">
      <div class="row">
        <div class="col-12">
          <UserMomentData />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <UserChart />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <UserStatData />
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-4">
      Схема и датчики
    </div>
  </div>
</template>

<script>
  import UserMomentData from './UserMomentData';
  import UserChart from './UserChart';
  import UserStatData from './UserStatData';

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChart,
      UserStatData,
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
