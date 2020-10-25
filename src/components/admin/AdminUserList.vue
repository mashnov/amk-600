<template>
  <div class="row admin-user-list">
    <div class="col-12">
      {{ userData }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { ADMIN } from '~/store/types';

  export default {
    name: 'AdminUserList',
    computed: {
      ...mapGetters('admin', {
        userData: ADMIN.GET_USER_DATA,
      }),
    },
  };
</script>
