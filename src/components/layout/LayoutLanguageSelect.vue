<template>
  <div class="layout-navigation">
    <template v-if="!userIsAuthed">
      <div class="layout-navigation_item">
        <UserIcon />
      </div>
    </template>
    <template v-if="userIsAuthed && !userIsAdmin">
      <div class="layout-navigation_item">
        <DashboardIcon />
      </div>
    </template>
    <template v-if="userIsAuthed && userIsAdmin">
      <div class="layout-navigation_item">
        <SettingsIcon />
      </div>
    </template>
    <div class="layout-navigation_item">
      <LanguageIcon />
    </div>
    <template v-if="userIsAuthed">
      <div class="layout-navigation_item">
        <Report1Icon />
      </div>
    </template>
    <template v-if="userIsAuthed">
      <div class="layout-navigation_item">
        <Report2Icon />
      </div>
    </template>
    <template v-if="userIsAuthed">
      <div class="layout-navigation_item">
        <Report3Icon />
      </div>
    </template>
    <template v-if="userIsAuthed">
      <div class="layout-navigation_item">
        <LogoutIcon />
      </div>
    </template>
  </div>
</template>

<script>
  import UserIcon from '~/assets/svg/user-icon.svg';
  import DashboardIcon from '~/assets/svg/dashboard-icon.svg';
  import SettingsIcon from '~/assets/svg/settings-icon.svg';
  import LanguageIcon from '~/assets/svg/language-icon.svg';
  import Report1Icon from '~/assets/svg/report-1-icon.svg';
  import Report2Icon from '~/assets/svg/report-2-icon.svg';
  import Report3Icon from '~/assets/svg/report-3-icon.svg';
  import LogoutIcon from '~/assets/svg/logout-icon.svg';

  export default {
    name: 'LayoutNavigation',
    components: {
      UserIcon,
      DashboardIcon,
      SettingsIcon,
      LanguageIcon,
      Report1Icon,
      Report2Icon,
      Report3Icon,
      LogoutIcon,
    },
    computed: {
      userIsAuthed() {
        //TODO: REPLACE BY STORE
        return false;
      },
      userIsAdmin() {
        //TODO: REPLACE BY STORE
        return false;
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
    width: 40px;
    height: 40px;
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
  .layout-navigation_item:hover {
    background-color: $color-violet-01;
  }
  .layout-navigation_item svg {
    display: block;
    width: 16px;
    height: 16px;
    color: $color-gray-01;
    margin: auto;
  }
</style>
