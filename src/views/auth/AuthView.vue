<template>
  <div class="auth-view">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <AuthPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import storeMixin from '~/mixins/storeMixin';
  import adminModule from '~/store/admin';
  import AuthPage from '~/components/auth/AuthPage';

  export default {
    name: 'AuthView',
    components: {
      AuthPage,
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
  .auth-view {
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
