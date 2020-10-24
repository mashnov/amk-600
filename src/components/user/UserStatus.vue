<template>
  <div class="user-status">
    <div class="row mb-5">
      <div class="col-12">
        <div class="row mb-5">
          <div class="col-12">
            <div class="user-status__title">
              {{ deviceData.name }}
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12 col-lg-6">
            <GeolocationIcon />
          </div>
          <div class="col-12 col-lg-6">
            <PowerIcon />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12 col-lg-6">
            <CalendarIcon />
          </div>
          <div class="col-12 col-lg-6">
            <TemperatureIcon />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12 col-lg-6">
            <TimeIcon />
          </div>
          <div class="col-12 col-lg-6">
            <VoltageIcon />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <UserDevice />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES, USER } from '~/store/types';

  import GeolocationIcon from '~/assets/svg/geolocation-icon.svg';
  import PowerIcon from '~/assets/svg/power-icon.svg';
  import CalendarIcon from '~/assets/svg/calendar-icon.svg';
  import TemperatureIcon from '~/assets/svg/temperature-icon.svg';
  import TimeIcon from '~/assets/svg/time-icon.svg';
  import VoltageIcon from '~/assets/svg/voltage-icon.svg';
  import UserDevice from './UserDevice';

  export default {
    name: 'UserStatData',
    components: {
      GeolocationIcon,
      PowerIcon,
      CalendarIcon,
      TemperatureIcon,
      TimeIcon,
      VoltageIcon,
      UserDevice,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        deviceData: USER.GET_DEVICE_DATA,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .user-status__title {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    color: $color-gray-01;
  }
</style>
