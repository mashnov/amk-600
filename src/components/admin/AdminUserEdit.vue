<template>
  <div class="col-11 col-sm-8 col-lg-6 col-xl-5 admin-user-edit">
    <div class="row">
      <div class="col-12 mb-5">
        <div class="admin-user-edit__title">
          {{ modalTitle }}
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <AmkInput
          :value="username"
          :placeholder="i18n.admin_userModalUserNamePlaceholder"
          @input="username = $event.target.value"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <AmkInput
          type="password"
          :value="password"
          :placeholder="passwordPlaceholder"
          @input="password = $event.target.value"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <AmkCheckbox
          :value="isAdmin"
          @input="isAdmin = $event"
        >
          {{ i18n.admin_addUserModalAdminCheckbox }}
        </AmkCheckbox>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 d-flex">
        <AmkButton
          class="ml-auto mr-auto"
          :disabled="submitIsDisabled"
          @click="submitClickHandler"
        >
          {{ submitButtonText }}
        </AmkButton>
      </div>
      <div
        v-if="!isNewUser"
        class="col-12 col-md-6 d-flex"
      >
        <AmkButton
          class="ml-auto mr-auto"
          :disabled="submitIsDisabled"
          @click="removeClickHandler"
        >
          {{ i18n.admin_removeUserModalTitle }}
        </AmkButton>
      </div>
    </div>
  </div>
</template>

<script>
  import isNull from 'lodash/isNull';
  import find from 'lodash/find';
  import get from 'lodash/get';
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, PRELOADER, MODAL, ADMIN, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AmkButton from '~/components/form-items/amk-button/AmkButton';
  import AmkInput from '~/components/form-items/amk-input/AmkInput';
  import AmkCheckbox from '~/components/form-items/amk-checkbox/AmkCheckbox';

  const PRELOADER_KEY = 'userEdit';

  export default {
    name: 'AdminUserEdit',
    components: {
      AmkInput,
      AmkButton,
      AmkCheckbox,
    },
    data: () => ({
      isNewUser: false,
      isAdmin: false,
      username: null,
      password: null,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        userData: ADMIN.GET_USER_DATA,
        selectUser: ADMIN.GET_SELECTED_USER,
      }),
      passwordPlaceholder() {
        const { i18n, isNewUser } = this;
        return isNewUser ? i18n.admin_userModalPasswordPlaceholder : i18n.admin_userModalPasswordOptionalPlaceholder;
      },
      submitButtonText() {
        const { i18n, isNewUser } = this;
        return isNewUser ? i18n.admin_addUserModalButton : i18n.admin_editUserModalButton;
      },
      modalTitle() {
        const { i18n, isNewUser } = this;
        return isNewUser ? i18n.admin_addUserModalTitle : i18n.admin_editUserModalTitle;
      },
      submitIsDisabled() {
        const { isNewUser, username, password } = this;
        const usernameIsCorrect = username && username.length > 3;
        const passwordIsCorrect = (isNewUser && password && password.length) > 3 || !isNewUser;
        return !(usernameIsCorrect && passwordIsCorrect);
      },
    },
    mounted() {
      this.setUserName();
      this.setUserType();
      this.setUserAdmin();
    },
    beforeDestroy() {
      this.setUsername(null);
    },
    methods: {
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      ...mapActions('modal', {
        closeModal: MODAL.HIDE_MODAL,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('admin', {
        fetchUserList: ADMIN.FETCH_USER_LIST,
        setUsername: ADMIN.SET_SELECTED_USER,
        addNewUser: ADMIN.ADD_USER,
        editUser: ADMIN.EDIT_USER,
        removeUser: ADMIN.REMOVE_USER,
      }),
      setUserName() {
        const { selectUser } = this;
        this.username = selectUser;
      },
      setUserType() {
        const { selectUser } = this;
        this.isNewUser = isNull(selectUser);
      },
      setUserAdmin() {
        const { isNewUser, selectUser, userData } = this;
        if (!isNewUser) {
          const user = find(userData, { username: selectUser });
          this.isAdmin = get(user, 'isAdmin', false);
        }
      },
      submitClickHandler() {
        const { isNewUser } = this;
        if (isNewUser) {
         this.addNewUserHandler();
        }
        if (!isNewUser) {
          this.editUserHandler();
        }
      },
      async addNewUserHandler() {
        const { isAdmin, username, password } = this;
        this.showPreloader(PRELOADER_KEY);
        const { successes, action } = await this.addNewUser({ isAdmin, username, password });
        if (successes && action) {
          await this.fetchUserList();
        }
        this.hidePreloader(PRELOADER_KEY);
        if (!successes) {
          this.closeModal();
          await this.logoutAction();
        }
        if (action) {
          this.closeModal();
        }
      },
      async editUserHandler() {
        const { isAdmin, username, password, selectUser } = this;
        this.showPreloader(PRELOADER_KEY);
        const { successes, action } = await this.editUser({ selectUser, isAdmin, username, password });
        if (successes && action) {
          await this.fetchUserList();
        }
        this.hidePreloader(PRELOADER_KEY);
        if (!successes) {
          this.closeModal();
          await this.logoutAction();
        }
        if (action) {
          this.closeModal();
        }
      },
      async removeClickHandler() {
        const { username } = this;
        this.showPreloader(PRELOADER_KEY);
        const { successes, action } = await this.removeUser({ username });
        if (successes && action) {
          await this.fetchUserList();
        }
        this.hidePreloader(PRELOADER_KEY);
        if (!successes) {
          this.closeModal();
          await this.logoutAction();
        }
        if (action) {
          this.closeModal();
        }
      },
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-user-edit__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
  }
</style>
