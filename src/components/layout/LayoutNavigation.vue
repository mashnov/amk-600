<template>
  <div class="layout-navigation">
    <div class="layout-navigation__wrapper">
      <transition-group
        name="fade-in"
        mode="out-in"
        tag="div"
      >
        <div
          v-if="!userIsAuthed"
          key="user"
          class="layout-navigation_item"
          :class="!userIsAuthed && 'layout-navigation_item_selected'"
        >
          <UserIcon />
        </div>
        <div
          v-if="userIsAuthed && !userIsAdmin"
          key="dashboard"
          class="layout-navigation_item"
          :class="userIsAuthed && !userIsAdmin && 'layout-navigation_item_selected'"
        >
          <DashboardIcon />
        </div>
        <div
          v-if="userIsAuthed && userIsAdmin"
          key="settings"
          class="layout-navigation_item"
          :class="userIsAuthed && userIsAdmin && 'layout-navigation_item_selected'"
        >
          <SettingsIcon />
        </div>
        <div
          v-if="userIsAuthed"
          key="report"
          v-tooltip.right="{ content: i18n.downloadReport, offset: 15 }"
          class="layout-navigation_item"
          @click="showReportModal"
        >
          <ReportIcon />
        </div>
        <div
          v-if="!deviceInfoIsLayout && userIsAuthed && !userIsAdmin"
          key="device"
          v-tooltip.right="{ content: i18n.deviceInfo, offset: 15 }"
          class="layout-navigation_item"
          @click="showDeviceModal"
        >
          <DeviceIcon />
        </div>
        <div
          key="language"
          v-tooltip.right="{ content: i18n.changeLanguage, offset: 15 }"
          class="layout-navigation_item"
          @click="showLanguageModal"
        >
          <LanguageIcon />
        </div>
        <div
          v-if="userIsAuthed"
          key="logout"
          v-tooltip.right="{ content: i18n.logout, offset: 15 }"
          class="layout-navigation_item"
          @click="logoutClickHandler"
        >
          <LogoutIcon />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import isNull from 'lodash/isNull';
  import { mapGetters, mapActions } from 'vuex';
  import { MODAL, AUTH, REFERENCES, PRELOADER, VIEWPORT } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import LayoutLanguageSelect from './LayoutLanguageSelect';
  import LayoutReportSelect from './LayoutReportSelect';
  import LayoutDeviceInfo from './LayoutDeviceInfo';
  import LayoutDevicePosition from './LayoutDevicePosition';

  import UserIcon from '~/assets/svg/user-icon.svg';
  import DashboardIcon from '~/assets/svg/dashboard-icon.svg';
  import SettingsIcon from '~/assets/svg/settings-icon.svg';
  import DeviceIcon from '~/assets/svg/device-icon.svg';
  import LanguageIcon from '~/assets/svg/language-icon.svg';
  import ReportIcon from '~/assets/svg/report-icon.svg';
  import LogoutIcon from '~/assets/svg/logout-icon.svg';

  const PRELOADER_KEY = 'logout';
  const ADMIN_USER_TYPE = 'admin';

  const DEVICE_INFO_IS_LAYOUT_FROM = 1640;

  export default {
    name: 'LayoutNavigation',
    components: {
      UserIcon,
      DashboardIcon,
      SettingsIcon,
      DeviceIcon,
      LanguageIcon,
      ReportIcon,
      LogoutIcon,
    },
    computed: {
      ...mapGetters('auth', {
        userType: AUTH.GET_USER_TYPE,
        userToken: AUTH.GET_USER_TOKEN,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('viewport', {
        viewportWidth: VIEWPORT.GET_VIEWPORT_WIDTH,
        viewportHeight: VIEWPORT.GET_VIEWPORT_HEIGHT,
      }),
      screenProportion() {
        const { viewportWidth, viewportHeight } = this;
        return Math.floor(viewportWidth / viewportHeight);
      },
      deviceInfoIsLayout() {
        const { viewportWidth } = this;
        return viewportWidth >= DEVICE_INFO_IS_LAYOUT_FROM;
      },
      userIsAuthed() {
        const { userToken } = this;
        return !isNull(userToken);
      },
      userIsAdmin() {
        const { userType } = this;
        return userType === ADMIN_USER_TYPE;
      },
    },
    watch: {
      screenProportion() {
        this.showDevicePositionModal();
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
      showDeviceModal() {
        this.showModal({
          component: LayoutDeviceInfo,
          position: 'right',
        });
      },
      showLanguageModal() {
        this.showModal({
          component: LayoutLanguageSelect,
        });
      },
      showReportModal() {
        this.showModal({
          component: LayoutReportSelect,
          position: 'bottom',
        });
      },
      showDevicePositionModal() {
        const { screenProportion } = this;
        if (screenProportion < 1) {
          this.showModal({
            component: LayoutDevicePosition,
          });
        }
      },
      async logoutClickHandler() {
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.logoutHandler();
        this.hidePreloader(PRELOADER_KEY);
        if (successes) {
          this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout-navigation {
    background-color: $color-gray-02;
  }
  .layout-navigation__wrapper {
    position: sticky;
    top: 50px;
    bottom: 50px;
  }
  .layout-navigation_item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 45px;
    height: 45px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
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
