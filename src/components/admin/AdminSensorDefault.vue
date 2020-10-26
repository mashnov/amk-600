<template>
  <div class="row admin-sensor-default">
    <div class="col-12 mb-5">
      <div class="admin-sensor-default__header">
        <div class="admin-sensor-default__title">
          {{ i18n.admin_sensorDefault_title }}
        </div>
      </div>
    </div>
    <div class="col-12 mb-5">
      <AdminSensorSection
        :title="i18n.admin_sensorHumidityTitle"
        :sensors="humiditySensors"
        :value="humidityValue"
        @select-item="changeMainSensorHandler({ name: $event, type: 'humidity' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorSection
        :title="i18n.admin_sensorPressureTitle"
        :sensors="pressureSensors"
        :value="pressureValue"
        @select-item="changeMainSensorHandler({ name: $event, type: 'pressure' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorSection
        :title="i18n.admin_sensorRainTitle"
        :sensors="rainSensors"
        :value="rainValue"
        @select-item="changeMainSensorHandler({ name: $event, type: 'rain' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminSensorSection
        :title="i18n.admin_sensorTemperatureTitle"
        :sensors="temperatureSensors"
        :value="temperatureValue"
        @select-item="changeMainSensorHandler({ name: $event, type: 'temperature' })"
      />
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { mapGetters, mapActions } from 'vuex';
  import { ADMIN, AUTH, PRELOADER, REFERENCES } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AdminSensorSection from './AdminSensorSection';

  const PRELOADER_KEY = 'setDefaultSensor';

  export default {
    name: 'AdminSensorDefault',
    components: {
      AdminSensorSection,
    },
    computed: {
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      sensors() {
        const { deviceData } = this;
        return get(deviceData, 'sensors', {});
      },
      humiditySensors() {
        const { sensors } = this;
        const list = get(sensors, 'humidity.allSensors', {});
        return Object.keys(list);
      },
      pressureSensors() {
        const { sensors } = this;
        const list = get(sensors, 'pressure.allSensors', {});
        return Object.keys(list);
      },
      rainSensors() {
        const { sensors } = this;
        const list = get(sensors, 'rain.allSensors', {});
        return Object.keys(list);
      },
      temperatureSensors() {
        const { sensors } = this;
        const list = get(sensors, 'temperature.allSensors', {});
        return Object.keys(list);
      },
      humidityValue() {
        const { sensors } = this;
        return get(sensors, 'humidity.main', null);
      },
      pressureValue() {
        const { sensors } = this;
        return get(sensors, 'pressure.main', null);
      },
      rainValue() {
        const { sensors } = this;
        return get(sensors, 'rain.main', null);
      },
      temperatureValue() {
        const { sensors } = this;
        return get(sensors, 'temperature.main', null);
      },
    },
    methods: {
      ...mapActions('admin', {
        changeMainSensor: ADMIN.CHANGE_MAIN_SENSOR,
        fetchStatData: ADMIN.FETCH_DATA,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async changeMainSensorHandler({ name, type }) {
        this.showPreloader(PRELOADER_KEY);
        const changeSensorResponse = await this.changeMainSensor({ name, type });
        const fetchSensorResponse = await this.fetchStatData();
        this.hidePreloader(PRELOADER_KEY);
        if (!changeSensorResponse.successes || !fetchSensorResponse.successes) {
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
  .admin-sensor-default__header {
    padding: 0 0 10px 0;
    border-bottom: 1px solid $color-gray-05;
  }
  .admin-sensor-default__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
</style>
