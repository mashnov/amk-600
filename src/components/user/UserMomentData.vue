<template>
  <div class="user-moment-data">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row mb-lg-4">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_temperatureSensorTitle"
              :unit="i18n.momentData_temperatureSensorUnit"
              :value="momentData.temperature"
              :is-active="reportTypes.includes('temperature')"
              @select-item="setReportTypes('temperature')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_humiditySensorTitle"
              :unit="i18n.momentData_humiditySensorUnit"
              :value="momentData.humidity"
              :is-active="reportTypes.includes('humidity')"
              @select-item="setReportTypes('humidity')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_pressureSensorTitle"
              :unit="i18n.momentData_pressureSensorUnit"
              :value="momentData.pressure"
              :is-active="reportTypes.includes('pressure')"
              @select-item="setReportTypes('pressure')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_rainSensorTitle"
              :unit="i18n.momentData_rainSensorUnit"
              :value="momentData.rainfall"
              :is-active="reportTypes.includes('rain')"
              @select-item="setReportTypes('rain')"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-lg-flex">
        <UserMomentWind />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, USER, REPORTS } from '~/store/types';

  import UserMomentSensor from './UserMomentSensor';
  import UserMomentWind from './UserMomentWind';

  export default {
    name: 'UserMomentData',
    components: {
      UserMomentSensor,
      UserMomentWind,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        momentData: USER.GET_MOMENT_DATA,
      }),
      ...mapGetters('reports', {
        reportTypes: REPORTS.GET_REPORT_TYPES,
      }),
    },
    methods: {
      ...mapActions('reports', {
        setReportTypes: REPORTS.SET_REPORT_TYPES,
      }),
    },
  };
</script>
