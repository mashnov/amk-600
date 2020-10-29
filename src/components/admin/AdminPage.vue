<template>
  <div class="row admin-page">
    <div class="col-12 mb-5">
      <AdminDeviceInfo />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorStatus />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorsData />
    </div>
    <div class="col-12 mb-5">
      <AdminUserList />
    </div>
  </div>
</template>

<script>
  import AdminDeviceInfo from './AdminDeviceInfo';
  import AdminSensorStatus from './AdminSensorStatus';
  import AdminSensorsData from './AdminSensorsData';
  import AdminUserList from './AdminUserList';

  export default {
    name: 'AdminPage',
    components: {
      AdminDeviceInfo,
      AdminSensorsData,
      AdminSensorStatus,
      AdminUserList,
    },
  };
</script>

<style lang="scss" scoped>
  .admin-page {
    padding: 20px 10px;
  }
  @media (min-width: $screen-lg) {
    .admin-page {
      padding: 50px;
    }
  }
</style>
