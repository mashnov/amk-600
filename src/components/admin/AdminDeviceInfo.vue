<template>
  <div class="row admin-device-info">
    <div class="col-12 mb-5">
      <div class="admin-device-info__header">
        <div class="admin-device-info__title">
          {{ deviceName }}
        </div>
        <div class="admin-device-info__sub-title">
          {{ deviceDateTime }}<br />
          Signal: {{ deviceSignal }}
        </div>
      </div>
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="GPS"
        :sensors="sensors.GPS"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="compass"
        :sensors="sensors.compass"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="humidity"
        :sensors="humiditySensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="temperature"
        :sensors="temperatureSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="rain"
        :sensors="rainSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="pressure"
        :sensors="pressureSensor"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="battery 1"
        :sensors="batterySensor1"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="battery 2"
        :sensors="batterySensor2"
      />
    </div>
    <div class="col-12 mb-5">
      <AdminDeviceSection
        title="wind 2"
        :sensors="windSensor.minute10"
      />
    </div>
    <div class="col-12">
      <AdminDeviceSection
        title="wind 10"
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
    .admin-device-info__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .admin-device-info__sub-title {
      margin-top: 0;
      margin-left: 10px;
    }
  }
</style>
