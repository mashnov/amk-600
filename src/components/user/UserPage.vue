<template>
  <div class="row justify-content-center user-page">
    <div class="col-12 col-xl-8">
      <UserMomentData />
      <UserChart />
      <UserStatData />
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
