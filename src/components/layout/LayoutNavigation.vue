<template>
  <div class="layout-navigation">
    <div
      class="layout-navigation_item"
      :class="!userIsAuthed && 'layout-navigation_item_selected'"
      v-if="!userIsAuthed"
    >
      <UserIcon/>
    </div>
    <div
      class="layout-navigation_item"
      :class="userIsAuthed && !userIsAdmin && 'layout-navigation_item_selected'"
      v-if="userIsAuthed && !userIsAdmin"
    >
      <DashboardIcon/>
    </div>
    <div
      class="layout-navigation_item"
      :class="userIsAuthed && userIsAdmin && 'layout-navigation_item_selected'"
      v-if="userIsAuthed && userIsAdmin"
    >
      <SettingsIcon/>
    </div>
    <div
      class="layout-navigation_item"
      @click="showReportModal"
      v-if="userIsAuthed"
    >
      <ReportIcon/>
    </div>
    <div
      class="layout-navigation_item"
      @click="showLanguageModal"
    >
      <LanguageIcon/>
    </div>
    <div
      class="layout-navigation_item"
      v-if="userIsAuthed"
      @click="logoutClickHandler"
    >
      <LogoutIcon/>
    </div>
  </div>
</template>

<script>
  import isNull from 'lodash/isNull';
  import { mapGetters, mapActions } from 'vuex';
  import { MODAL, AUTH, PRELOADER } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import LayoutLanguageSelect from './LayoutLanguageSelect';
  import LayoutReportSelect from './LayoutReportSelect';

  import UserIcon from '~/assets/svg/user-icon.svg';
  import DashboardIcon from '~/assets/svg/dashboard-icon.svg';
  import SettingsIcon from '~/assets/svg/settings-icon.svg';
  import LanguageIcon from '~/assets/svg/language-icon.svg';
  import ReportIcon from '~/assets/svg/report-icon.svg';
  import LogoutIcon from '~/assets/svg/logout-icon.svg';

  const PRELOADER_KEY = 'logout';
  const ADMIN_USER_TYPE = 'admin';

  export default {
    name: 'LayoutNavigation',
    components: {
      UserIcon,
      DashboardIcon,
      SettingsIcon,
      LanguageIcon,
      ReportIcon,
      LogoutIcon,
    },
    computed: {
      ...mapGetters('auth', {
        userType: AUTH.GET_USER_TYPE,
        userToken: AUTH.GET_USER_TOKEN,
      }),
      userIsAuthed() {
        const { userToken } = this;
        return !isNull(userToken);
      },
      userIsAdmin() {
        const { userType } = this;
        return userType === ADMIN_USER_TYPE;
      },
    },
    methods: {
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      ...mapActions('modal', {
        showModal: MODAL.SHOW_MODAL,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      showLanguageModal() {
        this.showModal({
          component: LayoutLanguageSelect,
        });
      },
      showReportModal() {
        this.showModal({
          component: LayoutReportSelect,
        });
      },
      async logoutClickHandler() {
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.logoutHandler();
        this.hidePreloader(PRELOADER_KEY);
        if (successes) {
          this.$router.push({ name: AUTH_ROUTE_NAMES.auth })
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout-navigation {
    background-color: $color-gray-02;
  }
  .layout-navigation_item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 45px;
    height: 45px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    transition: background-color $animation-time-01 $animation-easing;
    cursor: pointer;
  }
  .layout-navigation_item:first-child {
    margin-top: 80px;
  }
  .layout-navigation_item:not(:last-child) {
    margin-bottom: 55px;
  }
  .layout-navigation_item_selected {
    background-color: $color-violet-01;
  }
  .layout-navigation_item:hover {
    background-color: $color-violet-01;
  }
  .layout-navigation_item svg {
    display: block;
    width: 18px;
    height: 18px;
    color: $color-gray-01;
    margin: auto;
  }
</style>
