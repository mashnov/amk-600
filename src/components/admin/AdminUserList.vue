<template>
  <div class="admin-user-list">
    <div class="admin-user-list__header">
      <div class="row">
        <div class="col-12 col-md-10 md-4 md-md-0">
          <div class="admin-user-list__title">
            User list
          </div>
        </div>
        <div class="col-12 col-md-2 d-md-flex">
          <AmkButton
            class="ml-auto"
            @click="showNewUserModal"
          >
            {{ i18n.admin_addUser }}
          </AmkButton>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div
        v-for="(user, index) in userData"
        :key="index"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3"
      >
        <AdminUserItem
          :user="user"
          @select-user="showEditUserModal(user)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, MODAL, ADMIN } from '~/store/types';

  import AmkButton from '~/components/form-items/amk-button/AmkButton';
  import AdminUserItem from './AdminUserItem';
  import AdminUserEdit from './AdminUserEdit';

  export default {
    name: 'AdminUserList',
    components: {
      AmkButton,
      AdminUserItem,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        userData: ADMIN.GET_USER_DATA,
      }),
    },
    methods: {
      ...mapActions('modal', {
        showModal: MODAL.SHOW_MODAL,
      }),
      ...mapActions('admin', {
        selectUser: ADMIN.SET_SELECTED_USER,
      }),
      showNewUserModal() {
        this.showModal({
          component: AdminUserEdit,
        });
      },
      showEditUserModal({ username }) {
        this.selectUser(username);
        this.showModal({
          component: AdminUserEdit,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-user-list__header {
    padding: 0 0 10px 0;
    border-bottom: 1px solid $color-gray-05;
  }
  .admin-user-list__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
  @media (min-width: $screen-md) {
    .admin-user-list__title {
      font-size: 40px;
      line-height: 44px;
    }
  }
</style>
