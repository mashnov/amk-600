<template>
  <div class="row admin-sensor-list">
    <div class="col-12 mb-5">
      <div class="admin-sensor-list__header">
        <div class="admin-sensor-list__title">
          {{ i18n.admin_sensorStatus_title }}
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorGPSTitle"
            :status="modulesStatus.GPS"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorBattery1Title"
            :status="batteryStatus.battery1"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorBattery2Title"
            :status="batteryStatus.battery2"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorCompassTitle"
            :status="modulesStatus.compass"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorRainTitle"
            :status="modulesStatus.rain"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorWeatherTitle"
            :status="modulesStatus.weather"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <AdminSensorItem
            :title="i18n.admin_sensorWindTitle"
            :status="modulesStatus.wind"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { mapGetters } from 'vuex';
  import { ADMIN, REFERENCES } from '~/store/types';

  import AdminSensorItem from './AdminSensorItem';

  export default {
    name: 'AdminSensorList',
    components: {
      AdminSensorItem,
    },
    computed: {
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      modulesStatus() {
        const { deviceData } = this;
        return get(deviceData, 'sensors.modulesStatus', []);
      },
      batteryStatus() {
        const { modulesStatus } = this;
        return {
          battery1: get(modulesStatus, 'battery[0]', false),
          battery2: get(modulesStatus, 'battery[1]', false),
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-sensor-list__header {
    padding: 0 0 10px 0;
    border-bottom: 1px solid $color-gray-05;
  }
  .admin-sensor-list__title {
    display: block;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
    color: $color-gray-01;
  }
</style>
