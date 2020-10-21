<template>
  <div class="admin-view">
    <div class="container-fluid">
      <AdminPage />
    </div>
  </div>
</template>

<script>
  import storeMixin from '~/mixins/storeMixin';
  import adminModule from '~/store/admin';
  import AdminPage from '~/components/admin/AdminPage';

  export default {
    name: 'AdminView',
    components: {
      AdminPage,
    },
    mixins: [
      storeMixin,
    ],
    created() {
      this.$_registerStoreModule(adminModule);
    },
    destroyed() {
      this.$_unRegisterStoreModule(adminModule);
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
