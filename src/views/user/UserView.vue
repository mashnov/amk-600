<template>
  <div class="user-view">
    <div class="container-fluid">
      <UserPage />
    </div>
  </div>
</template>

<script>
  import storeMixin from '~/mixins/storeMixin';
  import userModule from '~/store/user';
  import UserPage from '~/components/user/UserPage';

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
    destroyed() {
      this.$_unRegisterStoreModule(userModule);
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
