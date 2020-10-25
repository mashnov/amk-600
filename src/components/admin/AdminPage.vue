<template>
  <div class="row admin-page">
    <div class="col-12 mb-5">
      <AdminDeviceName />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorList />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorDefault />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceInfo />
    </div>
    <div class="col-12 mb-5">
      <AdminUserList />
    </div>
  </div>
</template>

<script>
  import AdminDeviceName from './AdminDeviceName';
  import AdminSensorList from './AdminSensorList';
  import AdminSensorDefault from './AdminSensorDefault';
  import AdminDeviceInfo from './AdminDeviceInfo';
  import AdminUserList from './AdminUserList';

  export default {
    name: 'AdminPage',
    components: {
      AdminDeviceName,
      AdminSensorDefault,
      AdminDeviceInfo,
      AdminSensorList,
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
