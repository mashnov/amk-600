<template>
  <div class="row admin-device-info">
    <div class="col-12 mb-5">
      <div class="admin-device-info__header">
        <div class="admin-device-info__title">
          {{ i18n.admin_sensorData_title }}
        </div>
      </div>
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorGPSTitle"
        :sensors="sensors.GPS"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorCompassTitle"
        :sensors="sensors.compass"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorHumidityTitle"
        :sensors="humiditySensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorTemperatureTitle"
        :sensors="temperatureSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorRainTitle"
        :sensors="rainSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorPressureTitle"
        :sensors="pressureSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorBattery1Title"
        :sensors="batterySensor1"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorBattery2Title"
        :sensors="batterySensor2"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        :title="i18n.admin_sensorWind2Title"
        :sensors="windSensor.minute2"
      />
    </div>
    <div class="col-12">
      <AdminDeviceSection
        :title="i18n.admin_sensorWind10Title"
        :sensors="windSensor.minute10"
      />
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { DateTime } from 'luxon';
  import { mapGetters } from 'vuex';
  import { REFERENCES, ADMIN } from '~/store/types';

  import AdminDeviceSection from './AdminDeviceSection';

  export default {
    name: 'AdminDeviceInfo',
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
    },
  };
</script>

<style lang="scss" scoped>
  .admin-device-info__header {
    padding: 0 0 10px 0;
    border-bottom: 1px solid $color-gray-05;
  }
  .admin-device-info__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
</style>
