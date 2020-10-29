<template>
  <div class="row admin-sensors-data">
    <div class="col-12 mb-5">
      <div class="admin-sensors-data__header">
        <div class="admin-sensors-data__title">
          {{ i18n.sensorData }}
        </div>
      </div>
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.temperatureTitle"
        :sensors="temperatureSensor"
        :value="temperatureValue"
        :editable="true"
        @select-item="changeMainSensorHandler({ name: $event, type: 'temperature' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.humidityTitle"
        :sensors="humiditySensor"
        :value="humidityValue"
        :editable="true"
        @select-item="changeMainSensorHandler({ name: $event, type: 'humidity' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.pressureTitle"
        :sensors="pressureSensor"
        :value="pressureValue"
        :editable="true"
        @select-item="changeMainSensorHandler({ name: $event, type: 'pressure' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.rain"
        :sensors="rainSensor"
        :value="rainValue"
        :editable="true"
        @select-item="changeMainSensorHandler({ name: $event, type: 'rain' })"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.gps"
        :sensors="sensors.GPS"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.compass"
        :sensors="sensors.compass"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.windData2"
        :sensors="windSensor.minute2"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.windData10"
        :sensors="windSensor.minute10"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.battery1"
        :sensors="batterySensor1"
      />
    </div>
    <div class="col-12">
      <AdminDeviceSection
        :title="i18n.battery2"
        :sensors="batterySensor2"
      />
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { DateTime } from 'luxon';
  import { mapGetters, mapActions } from 'vuex';
  import { ADMIN, AUTH, PRELOADER, REFERENCES } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AdminDeviceSection from './AdminDeviceSection';

  const PRELOADER_KEY = 'setDefaultSensor';

  export default {
    name: 'AdminSensorsData',
    components: {
      AdminDeviceSection,
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
      humiditySensor() {
        const { sensors } = this;
        return get(sensors, 'humidity.allSensors', {});
      },
      temperatureSensor() {
        const { sensors } = this;
        return get(sensors, 'temperature.allSensors', {});
      },
      rainSensor() {
        const { sensors } = this;
        return get(sensors, 'rain.allSensors', {});
      },
      pressureSensor() {
        const { sensors } = this;
        return get(sensors, 'pressure.allSensors', {});
      },
      windSensor() {
        const { sensors } = this;
        return get(sensors, 'wind', {});
      },
      batterySensor1() {
        const { sensors } = this;
        return get(sensors, 'power.battery[0]', {});
      },
      batterySensor2() {
        const { sensors } = this;
        return get(sensors, 'power.battery[1]', {});
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
  .admin-sensors-data__header {
    padding: 0 0 10px 0;
    border-bottom: 1px solid $color-gray-05;
  }
  .admin-sensors-data__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
</style>
