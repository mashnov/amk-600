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
              @select-item="selectReportItem('temperature')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_humiditySensorTitle"
              :unit="i18n.momentData_humiditySensorUnit"
              :value="momentData.humidity"
              :is-active="reportTypes.includes('humidity')"
              @select-item="selectReportItem('humidity')"
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
              @select-item="selectReportItem('pressure')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_rainSensorTitle"
              :unit="i18n.momentData_rainSensorUnit"
              :value="momentData.rainfall"
              :is-active="reportTypes.includes('rain')"
              @select-item="selectReportItem('rain')"
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
  import { REFERENCES, PRELOADER, USER, REPORTS } from '~/store/types';

  import UserMomentSensor from './UserMomentSensor';
  import UserMomentWind from './UserMomentWind';

  const PRELOADER_KEY = 'userFetchChartData';

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
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      async selectReportItem(reportType) {
        this.showPreloader(PRELOADER_KEY);
        this.setReportTypes(reportType);
        await this.fetchChartData();
        this.hidePreloader(PRELOADER_KEY);
      },
    },
  };
</script>
