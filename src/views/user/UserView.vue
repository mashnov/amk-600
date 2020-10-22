<template>
  <div class="user-view">
    <div class="container-fluid">
      <UserPage />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { USER } from '~/store/types';

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
    mounted() {
      this.fetchData();
    },
    destroyed() {
      this.$_unRegisterStoreModule(userModule);
    },
    methods: {
      ...mapActions('user', {
        fetchData: USER.FETCH_DATA,
      }),
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
