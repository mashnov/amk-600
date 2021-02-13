<template>
  <div class="row admin-device-info">
    <div class="col-12 mb-5">
      <div class="admin-device-info__header">
        <div class="admin-device-info__title">
          {{ deviceName }}
        </div>
        <div class="admin-device-info__sub-title">
          {{ deviceDateTime }}<br />
          {{ i18n.signalTitle }}: {{ deviceSignal }}
        </div>
      </div>
    </div>
    <div class="col-12 mb-4">
      <AmkButton @click="clearLogsHandler">
        {{ i18n.clearLogs }}
      </AmkButton>
      <AmkButton @click="restartCpu">
        {{ i18n.restartCpu }}
      </AmkButton>
      <AmkButton @click="showChangeDeviceNameModal">
        {{ i18n.setDeviceParams }}
      </AmkButton>
      <AmkButton @click="showChangeCameraParamsModal">
        {{ i18n.setCameraParams }}
      </AmkButton>
      <AmkButton @click="showChangeCompassParamsModal">
        {{ i18n.setCompassParams }}
      </AmkButton>
      <AmkButton @click="showChangeWindParamsModal">
        {{ i18n.setWindParams }}
      </AmkButton>
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { DateTime } from 'luxon';
  import { mapGetters, mapActions } from 'vuex';
  import { AUTH, REFERENCES, PRELOADER, ADMIN, MODAL } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AdminDeviceNameEdit from './AdminDeviceNameEdit';
  import AdminCameraParamsEdit from './AdminCameraParamsEdit';
  import AdminCompassParamsEdit from './AdminCompassParamsEdit';
  import AdminAnemometerParamsEdit from './AdminAnemometerParamsEdit';
  import AmkButton from '~/components/form-items/amk-button/AmkButton';

  const PRELOADER_KEY = 'adminClearLogs';

  export default {
    name: 'AdminDeviceInfo',
    components: {
      AmkButton,
    },
    computed: {
      ...mapGetters('references', {
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      deviceName() {
        const { deviceData } = this;
        return get(deviceData, 'deviceName', '');
      },
      sensors() {
        const { deviceData } = this;
        return get(deviceData, 'sensors', {});
      },
      deviceSignal() {
        const { sensors } = this;
        return get(sensors, 'signal', 0);
      },
      deviceDateTime() {
        const { sensors, currentLanguage } = this;
        const deviceDate = get(sensors, 'date', '0000:000:00');
        const deviceTime = get(sensors, 'time', '00:00:00');
        const inputDateFormat = 'yyyy:LL:dd';
        const inputTimeFormat = 'hh:mm:ss';
        const luxonDate = DateTime.fromFormat(deviceDate, inputDateFormat);
        const luxonTime = DateTime.fromFormat(deviceTime, inputTimeFormat);
        const outputDate = luxonDate.setLocale(currentLanguage).toFormat('DDDD');
        const outputTime = luxonTime.setLocale(currentLanguage).toFormat('tt');
        return `${outputDate} ${outputTime}`;
      },
    },
    methods: {
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      ...mapActions('admin', {
        clearLogs: ADMIN.CLEAR_LOGS,
        restartCpu: ADMIN.RESTART_CPU,
      }),
      ...mapActions('modal', {
        showModal: MODAL.SHOW_MODAL,
      }),
      showChangeDeviceNameModal() {
        this.showModal({
          component: AdminDeviceNameEdit,
        });
      },
      showChangeCameraParamsModal() {
        this.showModal({
          component: AdminCameraParamsEdit,
        });
      },
      showChangeCompassParamsModal() {
        this.showModal({
          component: AdminCompassParamsEdit,
        });
      },
      showChangeWindParamsModal() {
        this.showModal({
          component: AdminAnemometerParamsEdit,
        });
      },
      async clearLogsHandler() {
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.clearLogs();
        this.hidePreloader(PRELOADER_KEY);
        if (!successes) {
          this.logoutAction();
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
  .admin-device-info__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
  .admin-device-info__sub-title {
    display: block;
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    color: $color-gray-01;
    margin-top: 10px;
  }
  @media (min-width: $screen-md) {
    .admin-device-info__title {
      font-size: 40px;
      line-height: 44px;
    }
  }
</style>
